import { Schema, model } from 'mongoose';
import { IPhotos } from './photos.interface';

const PhotosSchema = new Schema<IPhotos>(
  {
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Photos = model<IPhotos>('Photo', PhotosSchema);
