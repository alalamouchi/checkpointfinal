import React, { useState, useEffect } from "react";
import { Row, Container, Col, Carousel, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import Caroussel from "./Caroussel";
import Gallery from "./Gallery";

function BlogPage() {
    const [blog, setBlog] = useState();
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        axios
            .get("/api/user/blogs")
            .then((res) => {
                setBlog(res.data.data.find((elt) => elt._id == id));
            })
            .catch((err) => console.log(err));
    }, []);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
    return (
        <div>
            {blog ? (
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
                        <Col
                            md={10}
                            style={{
                                paddingBottom: " 0px",
                                fontSize: "2em",
                                display: "flex",
                                alignItems: "flex-end",
                            }}
                        >
                            {blog.title}
                        </Col>
                        <Col
                            md={2}
                            style={{
                                fontSize: "1.2em",
                                paddingBottom: " 0px",
                                display: "flex",
                                alignItems: "flex-end",
                            }}
                        >
                            {blog.owner}
                        </Col>
                    </Row>
                    <Row
                        style={{
                            marginBottom: "20px",
                            paddingBottom: " 5px",
                        }}
                    >
                        <Col md>
                            {blog.createdAt.slice(0, 10)} at
                            {blog.createdAt.slice(11, 16)}
                        </Col>
                    </Row>
                    <Row>
                        <Gallery
                            galleryID="my-test-gallery"
                            images={blog.photos.map((photo) => {
                                return {
                                    largeURL: photo.url,
                                    thumbnailURL: photo.url,
                                    width: photo.width,
                                    height: photo.heigth,
                                };
                            })}
                        />
                    </Row>
                    <Row
                        style={{
                            margin: "20px",
                            paddingBottom: " 5px",
                        }}
                    >
                        <Col md style={{ textAlign: "justify" }}>
                            {blog.text}
                        </Col>
                    </Row>
                </Container>
            ) : (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                    }}
                >
                    <SyncLoader size={15} color="#212529" />
                    Loading...
                </div>
            )}

            <Modal
                show={show}
                fullscreen={fullscreen}
                onHide={() => setShow(false)}
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>Modal</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <Caroussel
                        setFullscreen={setFullscreen}
                        blog={blog}
                        handleShow={handleShow}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default BlogPage;
