import {LoadingButton} from "@mui/lab";
import {Box, Button, Stack, TextField, Toolbar} from "@mui/material";
import {useState, useEffect, useCallback} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";

const mediaTypes = ["movie", "tv"];
let timer;
const timeout = 500;

const MediaSearch = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const initialQuery = searchParams.get("query") || "";
    const initialMediaType = searchParams.get("mediaType") || mediaTypes[0];

    const [inputValue, setInputValue] = useState(initialQuery);
    const [query, setQuery] = useState(initialQuery);
    const [onSearch, setOnSearch] = useState(false);
    const [mediaType, setMediaType] = useState(initialMediaType);
    const [medias, setMedias] = useState([]);
    const [page, setPage] = useState(1);

    const search = useCallback(
        async (searchQuery) => {
            setOnSearch(true);

            const {response, err} = await mediaApi.search({
                mediaType,
                query: searchQuery,
                page
            });

            setOnSearch(false);

            if (err) toast.error(err.message);
            if (response) {
                if (page > 1) setMedias(m => [...m, ...response.results]);
                else setMedias([...response.results]);
            }
        },
        [mediaType, page],
    );

    useEffect(() => {
        if (query.trim().length === 0) {
            setMedias([]);
            setPage(1);
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => search(query), timeout);
        }
    }, [search, query, mediaType, page]);

    const onCategoryChange = (selectedCategory) => {
        setMediaType(selectedCategory);
        searchParams.set("mediaType", selectedCategory);
        navigate({search: searchParams.toString()});
    };

    const onQueryChange = (e) => {
        const newQuery = e.target.value;
        setInputValue(newQuery);
        setQuery(newQuery);

        searchParams.set("query", newQuery);
        navigate({search: searchParams.toString()});
    };

    return (
        <>
            <Toolbar/>
            <Box sx={{...uiConfigs.style.mainContent}}>
                <Stack spacing={2}>
                    <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        sx={{width: "100%"}}
                    >
                        {mediaTypes.map((item, index) => (
                            <Button
                                size="large"
                                key={index}
                                variant={mediaType === item ? "contained" : "text"}
                                sx={{
                                    color: mediaType === item ? "primary.contrastText" : "text.primary"
                                }}
                                onClick={() => onCategoryChange(item)}
                            >
                                {item}
                            </Button>
                        ))}
                    </Stack>
                    <TextField
                        color="secondary"
                        placeholder="Search TacoMedia"
                        sx={{width: "100%"}}
                        autoFocus
                        onChange={onQueryChange}
                        value={inputValue}
                    />
                    <MediaGrid medias={medias} mediaType={mediaType}/>

                    {medias.length > 0 && (
                        <LoadingButton
                            loading={onSearch}
                            onClick={() => setPage(page + 1)}
                        >
                            load more
                        </LoadingButton>
                    )}
                </Stack>
            </Box>
        </>
    );
};

export default MediaSearch;