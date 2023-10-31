import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PhotosController } from './photos.controller';
import { PhotosValidation } from './photos.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(PhotosValidation.createPhotosZodSchema),
  PhotosController.uploadPhoto
);

router.get('/:id', PhotosController.getSinglePhoto);

router.get(
  '/',

  PhotosController.getAllPhotos
);

router.patch(
  '/:id',
  validateRequest(PhotosValidation.updatePhotosZodSchema),
  PhotosController.updatePhoto
);

router.delete('/', PhotosController.deletePhoto);

export const PhotosRoutes = router;
