import React, { useState, useEffect } from "react";
import { useLocation, Navigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import MediaItem from "../components/common/MediaItem";
import { Box, Grid } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import { toast } from "react-toastify";
import ContainerGuestProfile from "../components/common/ContainerGuestProfile";
import PublicReviewItem from "./PublicReviewItem";
import Container from "../components/common/Container"

const GuestUserProfile = () => {
    const { user } = useSelector(state => state.user);
    const { encodedName } = useParams();
    const displayName = decodeURIComponent(encodedName);

    const [medias, setMedias] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const apiUrl = `http://localhost:5000/api/v1/publicfavorites/${displayName}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setMedias(data);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to fetch favorites");
            });
    }, [displayName]);

    useEffect(() => {
        const apiUrl = `http://localhost:5000/api/v1/publicreviews/${displayName}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to fetch reviews");
            });
    }, [displayName]);

    const handleReviewRemoved = (reviewId) => {
        setReviews(reviews.filter(review => review.id !== reviewId));
    };

    return (
        <>
            {user && user.displayName === encodedName ? (
                <Navigate to="/profile" />
            ) : (
                <div>
                    <div style={{ marginTop: '100px', paddingLeft: "50px", color:"magenta", fontSize:"25px"}}>
                        <h1>{encodedName}'s Profile</h1>
                    </div>
                    <Box sx={{ ...uiConfigs.style.mainContent }}>
                        <ContainerGuestProfile header={`favorites (${medias.length})`} sx={{ mt: '0rem' }}>
                            <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
                                {medias.map((media, index) => (
                                    <Grid item xs={6} sm={4} md={3} key={index}>
                                        <MediaItem media={media} mediaType={media.mediaType} />
                                    </Grid>
                                ))}
                            </Grid>
                        </ContainerGuestProfile>

                        <Container header={`reviews (${reviews.length})`} sx={{ mt: '3rem' }}>
                            {reviews.map((review, index) => (
                                <PublicReviewItem key={index} review={review} onRemoved={handleReviewRemoved} />
                            ))}
                        </Container>
                    </Box>
                </div>
            )}
        </>
    );
};

export default GuestUserProfile;
