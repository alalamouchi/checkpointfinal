import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import OffCansVerifyEmail from "../reset_password/OffCansVerifyEmail";
function Login() {
    //LOCAL STATES
    const [user, setUser] = useState({});
    const [error, setError] = useState("");

    //FUNCTIONS
    const navigate = useNavigate();
    //HANDLE EVENTS
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handleLogin = async () => {
        await axios
            .post("/api/user/login", user)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("isUser", res.data.isUser);
                localStorage.setItem("id", res.data.id);
                navigate("/myBlogs");
            })
            .catch((err) => {
                // console.dir(err);
                setError(err.response.data.message);
            });
    };
    useEffect(() => {
        setTimeout(() => {
            setError("");
        }, 6000);
    }, [error]);
    return (
        <div className="Auth-form-container-login">
            <form
                className="Auth-form"
                onChange={(e) => {
                    handleChange(e);
                }}
            >
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Log In</h3>

                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            name="email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            name="password"
                        />
                    </div>
                    {error && (
                        <span style={{ color: "red", fontSize: "0.8em" }}>
                            {error}
                        </span>
                    )}
                    <div className="d-grid gap-2 mt-3">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                handleLogin();
                            }}
                        >
                            Submit
                        </button>
                    </div>

                    {/* <OffCansVerifyEmail
                        key={"idx"}
                        placement={"bottom"}
                        name={"bottom"}
                    /> */}
                    <p className="forgot-password text-right mt-2">
                        You don't have an account yet?
                        <Link to="/register"> Register now</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
