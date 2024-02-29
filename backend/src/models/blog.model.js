
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: [{  type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    views: [{  type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });


const blogModel = mongoose.model('Blog', BlogSchema);

export default blogModel;