import { apiErrorHandler } from "../middlewares/errorhandler.middleware.js";
import Comment from "../models/comments.model.js";
import Blog from "../models/blog.model.js";

const getAllComments = async (req, res, next) => {
    /* const blogId = req.params.id;
    if(!blogId) return next(apiErrorHandler(400, "Can not find the blog"));

    const allComments = await Blog.findById(
        {
            _id: blogId
        }
    ) */
}


const createNewComment = async (req, res, next) => {
    const { comment, user, blogId} = req.body;
    if(!comment || !user || !blogId) return next(apiErrorHandler(404, "Something went wrong"));
    console.log(comment, user, blogId);

    const newComment = new Comment({
        comment,
        user,
        blogId
    })

    try {
        await newComment.save()

        await Blog.findOneAndUpdate(
            {
                _id: blogId
            },
            {
                $push: {
                    comments: newComment._id
                }
            }
        )

        res.status(200).json({newComment, message: "Comment created successfully"})

    } catch (error) {
        next(apiErrorHandler(error))
    }
};


const deleteComment = async (req, res, next) => {}

export {
    getAllComments,
    createNewComment,
    deleteComment,
};