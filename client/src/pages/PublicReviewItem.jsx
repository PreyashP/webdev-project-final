import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import uiConfigs from "../configs/ui.configs";
import { routesGen } from "../routes/routes";

const PublicReviewItem = ({ review }) => {
    return (
        <Box sx={{
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            padding: 1,
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
        </Box>
    );
};

export default PublicReviewItem;
