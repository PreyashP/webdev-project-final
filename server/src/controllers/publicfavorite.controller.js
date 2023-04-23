import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";

const getList = async (req, res) => {
    const { username } = req.params;
    const user = await userModel.findOne({ username: username });
    const favorite = await favoriteModel.find({ user: user.id }).sort("-createdAt");
    responseHandler.ok(res, favorite);
};

export default { getList };
