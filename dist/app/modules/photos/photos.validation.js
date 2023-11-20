"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosValidation = void 0;
const zod_1 = require("zod");
const createPhotosZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        url: zod_1.z.string({
            required_error: 'Url is required ',
        }),
        name: zod_1.z.string().optional(),
    }),
});
const updatePhotosZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        url: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
    }),
});
exports.PhotosValidation = {
    createPhotosZodSchema,
    updatePhotosZodSchema,
};
