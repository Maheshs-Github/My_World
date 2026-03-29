import { createSlice } from "@reduxjs/toolkit";

const AnimeSlice = createSlice({
  name: "Anime",
  initialState: {
    All: [],
    Manga: [],
    Anime: [],
    LightNovel: [],
    Movie: [],
    Chars: [],
    CoplsDuo: [],
  },
  reducers: {
    setAllAnime: (state, action) => {
      state.All = action.payload;
    },
    setManga: (state, action) => {
      state.Manga = action.payload;
    },
    setAnime: (state, action) => {
      state.Anime = action.payload;
    },
    setLightNovel: (state, action) => {
      state.LightNovel = action.payload;
    },
    setMovie: (state, action) => {
      state.Movie = action.payload;
    },
    setChars: (state, action) => {
      state.Chars = action.payload;
    },
    setCoplsDuos: (state, action) => {
      state.CoplsDuo = action.payload;
    },
  },
});
export const { setAllAnime, setManga, setChars, setCoplsDuos, setAnime, setLightNovel, setMovie } =
  AnimeSlice.actions;
export default AnimeSlice.reducer;
