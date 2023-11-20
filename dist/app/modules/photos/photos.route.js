"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const photos_controller_1 = require("./photos.controller");
const photos_validation_1 = require("./photos.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(photos_validation_1.PhotosValidation.createPhotosZodSchema), photos_controller_1.PhotosController.uploadPhoto);
router.get('/:id', photos_controller_1.PhotosController.getSinglePhoto);
router.get('/', photos_controller_1.PhotosController.getAllPhotos);
router.patch('/:id', (0, validateRequest_1.default)(photos_validation_1.PhotosValidation.updatePhotosZodSchema), photos_controller_1.PhotosController.updatePhoto);
router.delete('/', photos_controller_1.PhotosController.deletePhoto);
exports.PhotosRoutes = router;
