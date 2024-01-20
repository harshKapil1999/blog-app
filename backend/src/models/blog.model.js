import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageurl: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });


const blogModel = mongoose.model('Blog', BlogSchema);

export default blogModel;