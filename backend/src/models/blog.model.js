import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });


const blogModel = mongoose.model('Blog', BlogSchema);

export default blogModel;