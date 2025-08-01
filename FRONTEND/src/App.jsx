import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Index from "./Components/Users/Index";
import Single from "./Components/Users/Single";
import DeletePost from "./Components/Admin/DeletePost";
import UpdatePost from "./Components/Admin/UpdatePost";
// import Post from "./Components/Admin/Post";

import Home from "./Components/Admin/Home";

import SearchResults from "./Components/Users/SearchResults";
import AddPost from "./Components/Admin/AddPost";
import Category from "./Components/Admin/Category";
import Users from "./Components/Admin/Users";
import Post from "./Components/Admin/Post";
// import AddUser from "./Components/Admin/AddUser";
import NavBar from "./Components/Admin/NavBar";
import AddCategory from "./Components/Admin/AddCategory";
import Updatecategory from "./Components/Admin/Updatecategory";
import UpdateUser from "./Components/Admin/UpdateUser";
import Footer from "./Components/Users/Footer";
import CategoryWise from "./Components/Users/CategoryWise";
import Register from "./Components/Register";
import Login from "./Components/Login";
import About from "./Components/Users/About";
// const About = () => <h2 className="text-center mt-5">About Page</h2>;
const Contact = () => <h2 className="text-center mt-5">Contact Page</h2>;

const App = () => {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        {/* <Route path="*" element={<Index />} /> */}


        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<Home />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/add-post" element={<AddPost />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/posts" element={<Post />} />
        <Route path="/about" element={<About />} />

        {/* <Route path="/admin/add-users" element={<AddUser />} /> */}

        <Route path="/admin/edit-category/:id" element={<Updatecategory />} />
        <Route path="/admin/edit-user/:id" element={<UpdateUser />} />
        <Route path="/admin/edit-post/:id" element={<UpdatePost />} />

        <Route path="/admin/add-category" element={<AddCategory />} />
        <Route path="/category/:id" element={<CategoryWise />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/delete-post" element={<DeletePost />} />
        <Route path="/edit-post" element={<UpdatePost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
};

export default App;
