import { apiErrorHandler } from "../middlewares/errorhandler.middleware.js";
import Comment from "../models/comments.model.js";


const getAllComments = async (req, res, next) => {
    const blogId = req.params.id;
    if(!blogId) return next(apiErrorHandler(400, "Can not find the blog"));
    //console.log(blogId);

    try {
        const allComments = await Comment.find({ blogId }).sort({ createdAt: -1 })
            .populate('user', 'name avatar')
        
        res.status(200).json(allComments);

    } catch (error) {
        next(apiErrorHandler(error))
    }
}


const createNewComment = async (req, res, next) => {
    const { comment, user, blogId} = req.body;
    if(!comment || !user || !blogId) return next(apiErrorHandler(404, "Something went wrong"));
    //console.log(comment, user, blogId);

    try {

        const newComment = new Comment({
                comment,
                user,
                blogId
            })
        await newComment.save();

        res.status(200).json({newComment, message: "Comment created successfully"});

    } catch (error) {
        next(apiErrorHandler(error))
    }
};


const deleteComment = async (req, res, next) => {
    const commentId = req.params.id;
    console.log(commentId)

    try {
        
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        res.status(200).json({ deletedComment, message: "Comment deleted successfully" });

    } catch (error) {
        next(apiErrorHandler(error));
    }
}

export {
    getAllComments,
    createNewComment,
    deleteComment,
};