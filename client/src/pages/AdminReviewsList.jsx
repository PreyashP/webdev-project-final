import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import { toast } from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs";
import reviewApi from "../api/modules/review.api";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import DeleteIcon from "@mui/icons-material/Delete";
import { routesGen } from "../routes/routes";

const ReviewItemAdmin = ({ review, onRemoved }) => {
    const [onRequest, setOnRequest] = useState(false);



    const onRemove = async () => {
        if (onRequest) return;
        setOnRequest(true);
        const { response, err } = await reviewApi.remove({ reviewId: review.id });
        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
            onRemoved(review.id);
        }
    };



    return (
        <Box sx={{
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            padding: 1,
            opacity: onRequest ? 0.6 : 1,
            "&:hover": { backgroundColor: "background.paper" }
        }}>
            <Box sx={{ width: { xs: 0, md: "20%" } }}>
                <Link
                    to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
                    style={{ color: "unset", textDecoration: "none" }}
                >
                    <Box sx={{
                        paddingTop: "160%",
                        ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(review.mediaPoster))
                    }} />
                </Link>
            </Box>

            <Box sx={{
                width: { xs: "100%", md: "80%" },
                padding: { xs: 0, md: "0 2rem" }
            }}>
                <Stack spacing={1}>
                    <Link
                        to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
                        style={{ color: "unset", textDecoration: "none" }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ ...uiConfigs.style.typoLines(1, "left") }}
                        >
                            {review.mediaTitle}
                        </Typography>
                    </Link>
                    <Typography variant="h7">
                        {dayjs(review.createdAt).format("DD-MM-YYYY\u00A0\u00A0\u00A0HH:mm")}
                    </Typography>
                    <Typography variant={"h6"}>{review.content}</Typography>
                </Stack>
            </Box>

            <LoadingButton
                variant="contained"
                sx={{
                    position: { xs: "relative", md: "absolute" },
                    right: { xs: 0, md: "10px" },
                    marginTop: { xs: 2, md: 0 },
                    width: "max-content"
                }}
                startIcon={<DeleteIcon />}
                loadingPosition="start"
                loading={onRequest}
                onClick={onRemove}
            >
                remove
            </LoadingButton>
        </Box>
    );
};

const AdminReviewsList = () => {
    const [reviews, setReviews] = useState([]);
    const [setLoading] = useState(true);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const getReviews = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/v1/adminreviews");
                const data = await response.json();
                setReviews(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        getReviews();
    }, []);

    if (user?.role !== 'admin') {
        navigate('/');
        return null;
    }

    const onRemoved = (id) => {
        const newReviews = [...reviews].filter(e => e.id !== id);
        setReviews(newReviews);
    };

    return (
        <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Container header={`reviews (${reviews.length})`}>
                <Stack spacing={2}>
                    {reviews.map((item) => (
                        <Box key={item.id}>
                            <ReviewItemAdmin review={item} onRemoved={onRemoved} />
                            <Divider sx={{
                                display: { xs: "block", md: "none" }
                            }} />
                        </Box>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};

export default AdminReviewsList;

