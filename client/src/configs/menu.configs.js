import {
    HomeOutlined,
    SlideshowOutlined,
    LiveTvOutlined,
    SearchOutlined,
    AccountCircle,
    RateReview
} from "@mui/icons-material";


const main = [
    {
        display: "home",
        path: "/",
        icon: <HomeOutlined/>,
        state: "home"
    },
    {
        display: "movies",
        path: "/movie",
        icon: <SlideshowOutlined/>,
        state: "movie"
    },
    {
        display: "tv shows",
        path: "/tv",
        icon: <LiveTvOutlined/>,
        state: "tv"
    },
    {
        display: "search",
        path: "/search",
        icon: <SearchOutlined/>,
        state: "search"
    }
];

const user = [

    //   Added Profile Page to User Nav Bar on Top Right #X
    {
        display: "profile page",
        path: "/profile",
        icon: <AccountCircle/>,
        state: "profile"
    },
    {
        display: "Admin Reviews",
        path: "/adminreviews",
        icon: <RateReview/>,
        state: "adminreviews"
    }
];

const menuConfigs = {main, user};

export default menuConfigs;