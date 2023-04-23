const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);

  return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
};

const getFullUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  const movieUrl = `${baseUrl}${endpoint}?api_key=${key}&${qs}&append_to_response=release_dates`;
  const tvUrl = `${baseUrl}${endpoint}?api_key=${key}&${qs}&append_to_response=content_ratings`;
  if (endpoint.includes("tv")) 
  return tvUrl;
  if (endpoint.includes("movie"))
  return movieUrl;
};

export default { getUrl, getFullUrl };