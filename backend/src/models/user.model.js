import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "https://picsum.photos/400"},
    allBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}],
}, { timestamps: true });

const userModel = mongoose.model('User', UserSchema);

export default userModel;