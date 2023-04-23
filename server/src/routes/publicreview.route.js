import express from "express";
import publicReviewController from "../controllers/publicreview.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/:username", publicReviewController.getList);

export default router;