import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";
import reviewModel from "../models/review.model.js";

const getList = async (req, res) => {
    const { username } = req.params;
    const user = await userModel.findOne({ username: username });
    const reviews = await reviewModel.find({ user: user.id }).sort("-createdAt");
    responseHandler.ok(res, reviews);
};

const getListAdmin = async (req, res) => {
    const reviews = await reviewModel.find().sort("-createdAt");
    responseHandler.ok(res, reviews);
};


export default { getList, getListAdmin };
