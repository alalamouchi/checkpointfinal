import React, { useState } from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
function ModalChangePassword({ showPasswordModal, handleClosePasswordModal }) {
    const [newPasswordObj, setNewPasswordObj] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        setNewPasswordObj({
            ...newPasswordObj,
            [e.target.name]: e.target.value,
        });
    };
    let id = localStorage.getItem("id");

    const handleSaveNewPassword = () => {
        // axios
        //     .put(`/api/user/resetpassword/${id}`, newPasswordObj)
        //     .then((res) => {
        //         if (res) {
        //             swal(res.data.message, "", "success").then(() => {
        //                 localStorage.removeItem("token");
        //                 localStorage.removeItem("isUser");
        //                 localStorage.removeItem("id");
        //                 handleClosePasswordModal();
        //                 navigate("/login");
        //             });
        //         }
        //     })
        //     .catch((err) => {
        //         console.dir(err);
        //         setError(err.response.data.error);
        //     });
        swal({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                axios
                    .put(
                        `/api/user/resetpassword/${id}`,
                        newPasswordObj
                    )
                    .then((res) => {
                        if (res) {
                            swal(res.data.message, "", "success").then(() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("isUser");
                                localStorage.removeItem("id");
                                handleClosePasswordModal();
                                navigate("/login");
                            });
                        }
                    })
                    .catch((err) => {
                        console.dir(err);
                        setError(err.response.data.error);
                    });
            } else {
                handleClosePasswordModal();
            }
        });
    };
    return (
        <Modal show={showPasswordModal} onHide={handleClosePasswordModal}>
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    onChange={(e) => {
                        handleChange(e);
                    }}
                >
                    <Form.Group className="mb-3">
                        <FloatingLabel
                            controlId="floatingPassword"
                            label="New Password"
                        >
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                autoFocus
                                autocomplete
                                name="newPassword"
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel
                            controlId="floatingPassword"
                            label="Confirm New Password"
                        >
                            <Form.Control
                                type="password"
                                name="confirmNewPassword"
                                placeholder="Confirm Password"
                                autocomplete
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Form>
                {error && (
                    <Form.Text style={{ color: "red" }}>{error}</Form.Text>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        handleClosePasswordModal();
                    }}
                >
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        handleSaveNewPassword();
                    }}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalChangePassword;
