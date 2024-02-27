import { apiErrorHandler, errorHandler } from "../middlewares/errorhandler.middleware.js";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

const getAllBlogs = async (req, res, next) => {
    try {
        const allBlogs = await Blog.find({})
            .populate('creator', '-password -email')
            
        res.status(200).json(allBlogs);
    } catch (error) {
        next(errorHandler(error));
    }
};

const getBlogDetails = async (req, res, next) => {
    const blogId = req.params.id;
    /* const validBlog = await Blog.find({_id: blogId});
    if(!validBlog) return next(apiErrorHandler(404, "Blog not found"));  */

    const blog = await Blog.findById(blogId)
        .populate('creator', '-password -email');
   
    if(!blog) return next(apiErrorHandler(404, "Blog not found"));


    res.status(200).json(blog);
};

const createBlog = async (req, res, next) => {
    const { title, imageUrl, shortDescription, description, category, userId } = req.body;
    //console.log({ title, imageUrl, shortDescription, description, category });
    if(!title || !imageUrl || !shortDescription || !description || !category || !userId) {
        return next(apiErrorHandler(404, "All fields are required"))
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
        next(errorHandler(error))
    }
};

const updateBlog = async (req, res, next) => {

};

const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id;
    
    const blog = await Blog.findByIdAndDelete(blogId);
    if(!blog) return next(apiErrorHandler(404, "Blog not found"));

    const deleteBlogId = await User.findByIdAndUpdate(blog.creator, {
        $pull: {
            allBlogs: { $in: [ blogId ]},
        }
    })
    //console.log(deleteBlogId)

    res.status(200).json({blog, deleteBlogId, message:"Blog is deleted successfully!"});
};

const updateViews = async (req, res, next) => {
    const {userId} = req.body;
    const blogId = req.params.id;
    if(!userId || !blogId) return next(apiErrorHandler(404, "Something went wrong"));
    //console.log(userId, blogId);
    
    try {
        const blog = await Blog.findById(blogId);
        if(!blog) return next(apiErrorHandler(404, "Something went wrong"));

        const userIndex = blog.views.indexOf(userId);
        if (userIndex === -1) {
            blog.views.push(userId);
        } else {
            return
        }
        
        res.status(200).json({blog, message: "Views Updated"})
    } catch (error) {
        next(apiErrorHandler(error))
    }
};

const updateLikes = async (req, res, next) => {
    const {userId} = req.body;
    const blogId = req.params.id;
    if(!userId || !blogId) return next(apiErrorHandler(404, "Something went wrong"));
    //console.log(userId, blogId);

    try {
        const blog = await Blog.findById(blogId);
        if(!blog) return next(apiErrorHandler(404, "Something went wrong"));
        console.log(blog);
        const userIndex = blog.likes.indexOf(userId);
        console.log(userIndex);
        if (userIndex === -1) {
            blog.likes.push(userId);
        } else {
            blog.likes.splice(userIndex, 1);
        }
        
        

        res.status(200).json({blog, message: "Like Updated"})
    } catch (error) {
        next(apiErrorHandler(error))
    }
};

export {
    getAllBlogs,
    getBlogDetails,
    createBlog,
    updateBlog,
    deleteBlog,
    updateViews,
    updateLikes,
};