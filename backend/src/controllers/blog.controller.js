import { apiErrorHandler, errorHandler } from "../middlewares/errorhandler.middleware.js";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

const getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await Blog.find({}).populate('creator', '-password -email');
        res.status(200).json(allBlogs);
    } catch (error) {
        console.log(error);
    }
};

const getBlogDetails = async (req, res, next) => {
    const blogId = req.params['id'];
    /* const validBlog = await Blog.find({_id: blogId});
    if(!validBlog) return next(apiErrorHandler(404, "Blog not found"));  */

    const blog = await Blog.findById(blogId).populate('creator', '-password -email');
    if(!blog) return next(apiErrorHandler(404, "Blog not found"));


    res.status(200).json(blog);
};

const createBlog = async (req, res, next) => {
    const { title, imageUrl, shortDescription, description, category, userId } = req.body;
    console.log({ title, imageUrl, shortDescription, description, category });
    if(!title || !imageUrl || !shortDescription || !description || !category || !userId) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const newBlog = new Blog({
        title,
        imageUrl,
        shortDescription,
        description,
        category,
        creator: userId,
    })

    try {
        await newBlog.save()

        await User.findOneAndUpdate(
            {
                _id: userId
            },
            {
            $push: {
                allBlogs: newBlog._id
            }
        })

        res.status(201).json({newBlog, message: "Blog is Created Successfully"})
    } catch (error) {
        errorHandler(error)
    }
};

const updateBlog = async (req, res) => {};
const deleteBlog = async (req, res) => {};




export {
    getAllBlogs,
    getBlogDetails,
    createBlog,
    updateBlog,
    deleteBlog,
};