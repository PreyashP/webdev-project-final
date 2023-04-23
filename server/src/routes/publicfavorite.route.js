import express from "express";
import publicFavoriteController from "../controllers/publicfavorite.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/:username", publicFavoriteController.getList);



export default router;