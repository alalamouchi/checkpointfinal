import React, { useEffect } from "react";
import { Row, Container, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";

function EmailConfirmation() {
    const { id } = useParams();
    useEffect(() => {
        axios
            .put(`/api/user/verifyEmail/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }, []);

    return (
        <Container
            style={{
                minHeight: "91vh",
                paddingTop: "25px",
                paddingBottom: "25px",
            }}
        >
            <Row
                style={{
                    marginBottom: "20px",
                    borderBottom: "2px grey solid",
                    paddingBottom: " 5px",
                }}
            >
                <Col md={6}>GoMyCode Blogs</Col>
            </Row>
            <Row className="g-4">
                <Col
                    style={{
                        backgroundColor: "#8ffca7",
                        minHeight: "100px",
                        fontSize: "2.5em",
                        textAlign: "center",
                    }}
                >
                    Your email was verified successfully!
                    {/* <Button btn="dark"></Button> */}
                    <div className=" gap-2 mt-3">
                        <Button
                            as={Link}
                            to="/login"
                            type="button"
                            className="btn btn-light"
                        >
                            Login <FiExternalLink />
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default EmailConfirmation;
