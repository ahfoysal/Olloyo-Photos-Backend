import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { photosFilterableFields } from './photos.constant';
import { IPhotos } from './photos.interface';
import { PhotosService } from './photos.service';

const uploadPhoto = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await PhotosService.uploadPhoto(data);

  sendResponse<IPhotos>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Photos Uploaded successfully!',
    data: result,
  });
});

const getSinglePhoto = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PhotosService.getSinglePhoto(id);

  sendResponse<IPhotos>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Photo fetched successfully !',
    data: result,
  });
});

const getAllPhotos = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, photosFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await PhotosService.getAllPhotos(filters, paginationOptions);

  sendResponse<IPhotos[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Photos retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updatePhoto = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await PhotosService.updatePhoto(id, updatedData);

  sendResponse<IPhotos>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Photos updated successfully !',
    data: result,
  });
});
const deletePhoto = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await PhotosService.deletePhoto(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Photo deleted successfully !',
    data: result,
  });
});

export const PhotosController = {
  uploadPhoto,
  getSinglePhoto,
  getAllPhotos,
  updatePhoto,
  deletePhoto,
};
