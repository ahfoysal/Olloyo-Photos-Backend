import { Photos } from '../app/modules/photos/photos.model';

export const findLastPhotoId = async (): Promise<number> => {
  const lastPhoto = await Photos.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  if (lastPhoto && lastPhoto.id) {
    const lastIdNumber = lastPhoto.id;
    if (!isNaN(lastIdNumber)) {
      return lastIdNumber + 1;
    }
  }

  return 1;
};
