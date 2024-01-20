import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

const getAllBlogs = async (req, res) => {};
const getBlogDetails = async (req, res) => {};
const createBlog = async (req, res) => {};
const updateBlog = async (req, res) => {};
const deleteBlog = async (req, res) => {};


async function CreateBlog(req, res) {
    const {title, description, category, imageurl} = req.body;

   

    const data = {
        title,
        description,
        category,
        imageurl
    }
    console.log(data);
    return res.json(data);

}

export {
    getAllBlogs,
    getBlogDetails,
    createBlog,
    updateBlog,
    deleteBlog,
    CreateBlog,
};