import { SortOrder } from 'mongoose';
import { findLastPhotoId } from '../../../helpers/IDFinder';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { photosSearchableFields } from './photos.constant';
import { IPhotos, IPhotosFilters } from './photos.interface';
import { Photos } from './photos.model';

const uploadPhoto = async (payload: IPhotos): Promise<IPhotos> => {
  const id = (await findLastPhotoId()) || 0;
  console.log(id);
  payload.id = id;

  const result = await Photos.create(payload);
  return result;
};

const getSinglePhoto = async (id: string): Promise<IPhotos | null> => {
  const result = await Photos.findById(id);
  return result;
};

const getAllPhotos = async (
  filters: IPhotosFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IPhotos[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: photosSearchableFields.map(field => ({
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

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Photos.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Photos.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updatePhoto = async (
  id: string,
  payload: Partial<IPhotos>
): Promise<IPhotos | null> => {
  const result = await Photos.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deletePhoto = async (payload: IPhotos[]): Promise<null> => {
  const idsToDelete = payload.map(photo => photo._id);

  const result = await Photos.deleteMany({ _id: { $in: idsToDelete } });
  return null;
};

export const PhotosService = {
  uploadPhoto,
  getSinglePhoto,
  getAllPhotos,
  updatePhoto,
  deletePhoto,
};
