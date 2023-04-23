import {PlayCircleOutlined, Star, StarBorder} from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import { toast } from "react-toastify";

import CircleRating from "../components/common/CircleRating";
import Container from "../components/common/Container";
import MediaBackdropHeader from "../components/common/MediaBackdropHeader";

import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import favoriteApi from "../api/modules/favorite.api";

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { addFavorite, removeFavorite } from "../redux/features/userSlice";

import CastSlide from "../components/common/CastSlide";
import MediaVideosSlide from "../components/common/MediaVideosSlide";
import RecommendSlide from "../components/common/RecommendSlide";
import MediaSlide from "../components/common/MediaSlide";
import MediaReview from "../components/common/MediaReview";


const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();

  const { user, listFavorites } = useSelector((state) => state.user);

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);
  const [ageRestricted, setAgeRestricted] = useState(false);

  const dispatch = useDispatch();

  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({ mediaType, mediaId });
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setGenres(response.genres.splice(0, 2));

        // GET ARRAY OF TV CONTENT RATING ACROSS COUNTRIES
        if (response.content_ratings && mediaType === "tv") {
          console.log("TRUE TV");
          console.log(Object.keys(response.content_ratings));
          const TVRatingsArray = response.content_ratings.results
              .map((result) => result.rating);
          console.log(JSON.stringify(TVRatingsArray));
          const not_restricted_check = TVRatingsArray.includes("TV-Y") ||
              TVRatingsArray.includes("TV-Y7") ||
              TVRatingsArray.includes("TV-G") ||
              TVRatingsArray.includes("TV-PG")
          ;
          console.log("NOT RESTRICTED CHECK === " + not_restricted_check);
          setAgeRestricted(!not_restricted_check);
        }

        // GET MOVIE CERTIFICATION (G, R,  PG, PG-13, etc. for the US)
        if (mediaType === "movie") {
          console.log("TRUE MOVIE");
          const getCertification = () => {
            const certification = "Whyy";
            const results_length = response.release_dates.results.length;
            for (let i = 0; i < results_length; i++) {
              if (response.release_dates.results[i].iso_3166_1 === "US") {
                const results_internal = response.release_dates.results[i].release_dates.length;
                console.log(results_internal);
                for (let j = 0; j < results_internal; j++) {
                  if (response.release_dates.results[i].release_dates[j].certification !== "") {
                    console.log(j);
                    return response.release_dates.results[i].release_dates[j].certification;
                  }
                }
              }
            }
            return certification;
          };

          const certification_us = getCertification();
          console.log("certification ======" + JSON.stringify(certification_us));
          const not_restricted_check_movie = certification_us === "G" || certification_us === "PG" ;
          console.log("NOT RESTRICTED CHECK MOVIE === " + not_restricted_check_movie);
          setAgeRestricted(!not_restricted_check_movie);
        }
      }

      if (err) toast.error(err.message);
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  const navigate = useNavigate();

  if (ageRestricted && user && user.role === "child") {
    return (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize:70, paddingTop: 200 }}>AGE RESTRICTED CONTENT</h1>
          <h2 style={{ fontSize: 25, marginBottom: 50 }}>Sorry, You Need Parental Permission To View This Content</h2>
          <button style={{
            fontSize: 50,
            fontWeight: "bold",
            padding: "30px 40px",
            backgroundColor: "purple",
            color: "white",
            borderRadius: 5,
            border: "none",
            cursor: "pointer"
          }} onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
  }


  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequest) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }
    setOnRequest(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average
    };

    const { response, err } = await favoriteApi.add(body);

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const favorite = listFavorites.find(e => e.mediaId.toString() === media.id.toString());

    const { response, err } = await favoriteApi.remove({ favoriteId: favorite.id });

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
    }
  };

  return (
    media ? (
      <>
        <MediaBackdropHeader imgPath={"#update to add backdrop image url"} />
        <Box sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent
        }}>
          {/* media */}
          <Box sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" }
          }}>
            <Box sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" }
            }}>
              {/* poster */}
              <Box sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" }
              }}>
                <Box sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path))
                }} />
              </Box>


              {/* media description */}
              <Box sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary"
              }}>
                <Stack spacing={5}>
                  {/* title */}
                  <Typography
                      variant="h4"
                      fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                      fontWeight="700"
                      sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                  >
                    {`${media.title || media.name}`}
                  </Typography>



                  {/* rate and genres */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* rate */}
                    <CircleRating value={media.vote_average} />

                    <Divider orientation="vertical" />
                    {/* genres */}
                    {genres.map((genre, index) => (
                      <Chip
                        label={genre.name}
                        variant="filled"
                        color="primary"
                        key={index}
                      />
                    ))}

                  </Stack>


                  {/* overview */}
                  <Typography
                    variant="body1"
                    sx={{ ...uiConfigs.style.typoLines(5) }}
                  >
                    {media.overview}
                  </Typography>


                  {/* buttons */}
                  <Stack direction="row" spacing={1}>
                    <LoadingButton
                      variant="text"
                      sx={{
                        width: "max-content",
                        "& .MuiButon-starIcon": { marginRight: "0" }
                      }}
                      size="large"
                      startIcon={isFavorite ? <Star /> : <StarBorder />}
                      loadingPosition="start"
                      loading={onRequest}
                      onClick={onFavoriteClick}
                    />
                    <Button
                      variant="contained"
                      sx={{ width: "max-content", borderRadius: "10px"}}
                      size="large"
                      startIcon={<PlayCircleOutlined />}
                      onClick={() => videoRef.current.scrollIntoView()}
                    >
                      watch trailer
                    </Button>
                  </Stack>


                  {/* cast */}
                  <Container header="Cast">
                    <CastSlide casts={media.credits.cast} />
                  </Container>

                </Stack>
              </Box>
              {/* media info */}
            </Box>
          </Box>
          {/* media content */}

          {/* media trailer */}
          <div ref={videoRef} style={{ paddingTop: "2rem" }}>
            <Container header="Trailer & Clips">
              <MediaVideosSlide videos={[...media.videos.results].splice(0, 5)} />
            </Container>
          </div>

          {/* media reviews */}
          <MediaReview reviews={media.reviews} media={media} mediaType={mediaType} />


          {/* similar recommendation based on category and high rating*/}
          <Container header="more like this">
            {media.recommend.length > 0 && (
              <RecommendSlide medias={media.recommend} mediaType={mediaType} />
            )}
            {media.recommend.length === 0 && (
              <MediaSlide
                mediaType={mediaType}
                mediaCategory={tmdbConfigs.mediaCategory.top_rated}
              />
            )}
          </Container>
        </Box>
      </>
    ) : null
  );
};

export default MediaDetail;