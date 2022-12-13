import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../login/Login.css";
function ResetPassword() {
    const { id } = useParams();
    //LOCAL STATES
    const [newPassword, setNewPassword] = useState({});
    const [error, setError] = useState("");

    //FUNCTIONS
    const navigate = useNavigate();
    //HANDLE EVENTS
    const handleChange = (e) => {
        setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
    };
    const handleReset = async () => {
        await axios
            .put(
                `/api/user/resetpassword/${id}`,
                newPassword
            )
            .then((res) => {
                navigate("/login");
            })
            .catch((err) => {
                setError(err.response.data.error);
            });
    };
    // useEffect(() => {
    //     setTimeout(() => {
    //         setError("");
    //     }, 6000);
    // }, [error]);
    return (
        <div className="Auth-form-container-login">
            <form
                className="Auth-form"
                onChange={(e) => {
                    handleChange(e);
                }}
            >
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Reset your password</h3>

                    <div className="form-group mt-3">
                        <label>New password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            name="newPassword"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            name="confirmNewPassword"
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
                                handleReset();
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ResetPassword;
