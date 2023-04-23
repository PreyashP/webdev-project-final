import express from "express";
import userRoute from "./user.route.js";
import mediaRoute from "./media.route.js";
import personRoute from "./person.route.js";
import reviewRoute from "./review.route.js";
import publicFavoritesRoute from "./publicfavorite.route.js";
import publicReviewsRoute from "./publicreview.route.js";
import adminReviewsRoute from "./adminreviews.route.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/person", personRoute);
router.use("/reviews", reviewRoute);
router.use("/publicfavorites", publicFavoritesRoute);
router.use("/publicreviews", publicReviewsRoute);
router.use("/adminreviews", adminReviewsRoute);
router.use("/:mediaType", mediaRoute);




export default router;