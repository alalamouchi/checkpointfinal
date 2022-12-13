import React, { useState } from "react";
import { Offcanvas, Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = (e) => {
        setEmail({ [e.target.name]: e.target.value });
    };
    const handleSend = () => {
        axios
            .post(
                "/api/user/resetpasswordmail",
                email
            )
            .then((res) => swal(res.data.message))
            .catch((err) => setError(err.response.data.message));
    };
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow} className="me-2">
                {name}
            </Button> */}
            <p className="forgot-password text-right mt-2">
                Forgot{" "}
                <a
                    onClick={() => {
                        handleShow();
                    }}
                    href="#"
                >
                    password?
                </a>
            </p>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Please enter your email</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body
                    style={{
                        paddingLeft: "30%",
                    }}
                >
                    <Form>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextEmail"
                        >
                            <Form.Label column sm="1">
                                Email
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control
                                    placeholder="email@example.com"
                                    name="email"
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />
                                {error && (
                                    <span
                                        style={{
                                            color: "red",
                                            fontSize: "0.8em",
                                        }}
                                    >
                                        {error}
                                    </span>
                                )}
                            </Col>
                            <Col sm="4">
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => handleSend()}
                                >
                                    Send
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
export default OffCanvasExample;
