const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        photos: {
            type: [
                {
                    url: "string",
                    width: Number,
                    heigth: Number,
                },
            ],
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("blogs", blogSchema);
