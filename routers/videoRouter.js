import express from "express";
import { deleteVideo, editVideo, getUpload, postUpload, upload, videoDetail, videos } from '../controllers/videoController';
import { uploadVideo } from '../middlewares';
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);


export default videoRouter;