// #X
import React from "react";
import { Typography } from "@mui/material";
import {useSelector} from "react-redux";
import FavoriteList from './FavoriteList';
import ReviewList from './ReviewList';
import PasswordUpdate from './PasswordUpdate';



const User_Profile = () => {
    const { user } = useSelector((state) => state.user);
    return (
        <div>
        <Typography variant="h3" component="h2" paddingTop={10} paddingLeft={3} color={"magenta"} fontWeight={"bold"}>
            <Typography variant="h3" component="span" textTransform="uppercase" fontWeight={"bold"}>{user.displayName}</Typography>'s Profile Page
            <div>
            </div>
        </Typography>

            <FavoriteList/>
            <ReviewList/>
            <PasswordUpdate/>
        </div>

    );
};

export default User_Profile;
