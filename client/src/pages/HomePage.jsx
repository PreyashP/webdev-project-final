import React from 'react';
import { useSelector } from 'react-redux';
import tmdbConfigs from "../api/configs/tmdb.configs";
import {Box} from '@mui/material';
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";
import HomeFavoriteList from "./HomeFavoriteList";

const HomePage = () => {
    const { user } = useSelector(state => state.user);

    return (
        <>
            {/*Home Welcome Banner*/}


            {/*Recently Favorited*/}
            {user && <HomeFavoriteList/>}

            {/*Highly Rated Movies*/}
            <Box marginTop="-4rem" sx={{...uiConfigs.style.mainContent}}>
                <Container header="highly rated movies">
                    <MediaSlide mediaType={tmdbConfigs.mediaType.movie}
                                mediaCategory={tmdbConfigs.mediaCategory.top_rated}/>
                </Container>

                {/*Popular Movies*/}
                <Container header="popular movies">
                    <MediaSlide mediaType={tmdbConfigs.mediaType.movie}
                                mediaCategory={tmdbConfigs.mediaCategory.popular}/>
                </Container>

                {/*Highly Rated Tv Shows*/}
                <Container header="highly rated tv shows">
                    <MediaSlide mediaType={tmdbConfigs.mediaType.tv}
                                mediaCategory={tmdbConfigs.mediaCategory.top_rated}/>
                </Container>
            </Box>
        </>
    );
};

export default HomePage;
