import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MediaItem from "../components/common/MediaItem";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import favoriteApi from "../api/modules/favorite.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

const HomeFavoriteItem = ({ media }) => {
    return (
        <>
            <MediaItem media={media} mediaType={media.mediaType} />
        </>
    );
};

const HomeFavoriteList = () => {
    const [medias, setMedias] = useState([]);
    const [filteredMedias, setFilteredMedias] = useState([]);
    const [count, setCount] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        const getFavorites = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await favoriteApi.getList();
            dispatch(setGlobalLoading(false));

            if (err) toast.error(err.message);
            if (response) {
                setCount(response.length);
                setMedias(response.slice(-2)); // only retrieve the last 2 favorites
                setFilteredMedias(response.slice(-2)); // set only the last 2 favorites to filteredMedias
            }
        };

        getFavorites();
    }, []);

    return (
        <>
            {count > 0 ? (
                <Box sx={{ ...uiConfigs.style.mainContent }}>
                    <Container header={`Recently Favorited`}>
                        <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
                            {filteredMedias.map((media, index) => (
                                <Grid item xs={6} sm={4} md={3} key={index}>
                                    <HomeFavoriteItem media={media} />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            ) : (
                <Box sx={{ ...uiConfigs.style.mainContent }}>
                    <Container header={`Recently Favorited`}>
                        <p style={{ fontSize: "20px" }}>
                            Add Media To Your Favorites To Display Them Here!
                        </p>
                    </Container>
                </Box>
            )}
        </>
    );
};

export default HomeFavoriteList;
