"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosService = void 0;
const IDFinder_1 = require("../../../helpers/IDFinder");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const photos_constant_1 = require("./photos.constant");
const photos_model_1 = require("./photos.model");
const uploadPhoto = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (yield (0, IDFinder_1.findLastPhotoId)()) || 0;
    console.log(id);
    payload.id = id;
    const result = yield photos_model_1.Photos.create(payload);
    return result;
});
const getSinglePhoto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield photos_model_1.Photos.findById(id);
    return result;
});
const getAllPhotos = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: photos_constant_1.photosSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield photos_model_1.Photos.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield photos_model_1.Photos.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updatePhoto = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield photos_model_1.Photos.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deletePhoto = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const idsToDelete = payload.map(photo => photo._id);
    const result = yield photos_model_1.Photos.deleteMany({ _id: { $in: idsToDelete } });
    return null;
});
exports.PhotosService = {
    uploadPhoto,
    getSinglePhoto,
    getAllPhotos,
    updatePhoto,
    deletePhoto,
};
