import React, { useState } from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function ModalChangeEmail({ showEmailModal, handleCloseEmailModal }) {
    const [newEmailObj, setNewEmailObj] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        setNewEmailObj({
            ...newEmailObj,
            [e.target.name]: e.target.value,
        });
    };
    let id = localStorage.getItem("id");

    const handleSaveNewEmail = () => {
        swal({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                axios
                    .put(`/api/user/changeEmail/${id}`, newEmailObj)
                    .then((res) => {
                        if (res) {
                            swal(res.data.message, "", "success").then(() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("isUser");
                                localStorage.removeItem("id");
                                handleCloseEmailModal();
                                navigate("/login");
                            });
                        }
                        console.log(res);
                    })
                    .catch((err) => {
                        console.dir(err);
                        setError(err.response.data.error);
                    });
            } else {
                handleCloseEmailModal();
            }
        });
    };
    return (
        <Modal show={showEmailModal} onHide={handleCloseEmailModal}>
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
                            label="Current Email"
                        >
                            <Form.Control
                                type="email"
                                placeholder="Current email"
                                autoFocus
                                autocomplete
                                name="oldEmail"
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel
                            controlId="floatingPassword"
                            label="New Email"
                        >
                            <Form.Control
                                type="email"
                                name="newEmail"
                                placeholder="New email"
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
                        handleCloseEmailModal();
                    }}
                >
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        handleSaveNewEmail();
                    }}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalChangeEmail;
