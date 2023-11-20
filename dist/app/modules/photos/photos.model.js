"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photos = void 0;
const mongoose_1 = require("mongoose");
const PhotosSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    id: {
        type: Number,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Photos = (0, mongoose_1.model)('Photo', PhotosSchema);
