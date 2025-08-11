const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, "Title cannot be longer than 200 characters"]
    },
    content: {
        type: String,
        required: true,
        minlength: [10, "Content must be at least 10 characters long"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: {
        type: [String],
        default: ["general"]
    },
    category: {
        type: String,
        default: "general"
    },
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, trim: true },
        createdAt: { type: Date, default: Date.now }
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
