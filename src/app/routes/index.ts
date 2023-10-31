import express from 'express';
import { PhotosRoutes } from '../modules/photos/photos.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/photos',
    route: PhotosRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
