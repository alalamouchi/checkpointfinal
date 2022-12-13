import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBlogs } from "../../../redux/actions/userActions";
import BlogItem from "../Blogs/BlogItem";
import { Container, Row, Col, Form } from "react-bootstrap";
import ToastMsg from "../Blogs/ToastMsg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MyBlogs.css";
function MyBlogs() {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const handleChange = (e) => {
        setSearch(e.target.value);
    };
    const handleDateFilter = (e) => {
        setDateFilter(e.target.value);
    };
    const dispatch = useDispatch();
    const myBlogs = useSelector((state) => state.userReducer.myblogs);
    useEffect(() => {
        dispatch(getMyBlogs({ id, token }));
    }, [myBlogs]);

    return (
        <div className="my-blogs-container">
            <Container>
                <Row
                    style={{
                        marginBottom: "20px",
                        borderBottom: "2px grey solid",
                    }}
                >
                    <Col md={6}>
                        <h2>My blogs </h2>
                    </Col>
                    <Col md={4}>
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Control
                            as="input"
                            type="date"
                            id="exampleColorInput"
                            defaultValue="#563d7c"
                            title="Choose your color"
                            onChange={(e) => {
                                handleDateFilter(e);
                            }}
                        />
                    </Col>
                </Row>

                {myBlogs.length >= 1 ? (
                    <Row xs={1} lg={3} className="g-4">
                        {myBlogs
                            .filter((blog) => {
                                return search && !dateFilter
                                    ? blog.title
                                          .toLowerCase()
                                          .includes(search.toLowerCase()) ||
                                          blog.owner
                                              .toLowerCase()
                                              .includes(search.toLowerCase())
                                    : dateFilter && !search
                                    ? blog.createdAt.includes(dateFilter)
                                    : blog;
                            })
                            .map((blog) => {
                                return <BlogItem key={blog._id} {...blog} />;
                            })}
                    </Row>
                ) : (
                    <div>
                        <h1>Empty list.</h1>
                    </div>
                )}
            </Container>
            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default MyBlogs;
