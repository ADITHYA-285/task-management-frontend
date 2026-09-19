import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(email, password);

            localStorage.setItem("token", data.token);
           localStorage.setItem("name", data.user.name);

            navigate("/dashboard");

        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="login-page">

            {/* Background decorations */}

            <div className="bg-circle circle-one"></div>
            <div className="bg-circle circle-two"></div>
            <div className="bg-circle circle-three"></div>

            <div className="floating-item item-one">
                ✓
            </div>

            <div className="floating-item item-two">
                📝
            </div>

            <div className="floating-item item-three">
                💻
            </div>

            <div className="floating-item item-four">
                ☕
            </div>

            <div className="floating-item item-five">
                ✓
            </div>

            <div className="floating-item item-six">
                📅
            </div>


            {/* Motivational text */}

            <div className="bg-text text-one">
                Organize<br />
                Plan<br />
                Achieve
            </div>

            <div className="bg-text text-two">
                Small Steps<br />
                Big Progress
            </div>

            <div className="bg-text text-three">
                Good Tasks<br />
                Brighter Days
            </div>


            {/* Login card */}

            <div className="login-card">

                <div className="login-logo">
                    TaskFlow
                </div>

                <div className="login-header">

                    <h1>Welcome back</h1>

                    <p>
                        Sign in to continue managing your tasks.
                    </p>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="login-form-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <div className="input-wrapper">

                            <span className="input-icon">
                                ✉
                            </span>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>

                    </div>


                    <div className="login-form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="input-wrapper">

                            <span className="input-icon">
                                🔒
                            </span>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                    </div>

                    <p className="register-link">
                        Don't have an account?{" "}
                        <Link to="/register">
                            Create an account
                        </Link>
                    </p>


                    <button
                        type="submit"
                        className="login-btn"
                    >
                        Sign In
                    </button>

                    

                </form>




                {message && (
                    <p className="login-error">
                        {message}
                    </p>
                )}

            </div>

        </div>
    );
};

export default Login;