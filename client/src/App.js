import "./App.css";
import React, { useEffect } from "react";
import Layout from "./components/views/Layout";
import Register from "./components/views/register/Register";
import Login from "./components/views/login/Login";
import Blogs from "./components/views/Blogs/Blogs";
import MyBlogs from "./components/views/user/MyBlogs";
import UserRoute from "./components/routes/UserRoute";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./components/views/reset_password/ResetPassword";
import EmailConfirmation from "./components/views/confirmation/EmailConfirmation";
import BlogPage from "./components/views/Blogs/BlogPage";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Blogs />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route
                        path="myBlogs"
                        element={
                            <UserRoute>
                                <MyBlogs />
                            </UserRoute>
                        }
                    />
                    <Route path="/blog/:id" element={<BlogPage />} />
                </Route>
                <Route path="/reset-password/:id" element={<ResetPassword />} />
                <Route
                    path="/confirmation/:id"
                    element={<EmailConfirmation />}
                />
            </Routes>
        </div>
    );
}

export default App;
