import express from "express";
import publicReviewController from "../controllers/publicreview.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", publicReviewController.getListAdmin);

export default router;
