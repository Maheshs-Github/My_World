import { configureStore } from "@reduxjs/toolkit";
import PortfolioReducer  from "../redux/PortfolioSlice";
import AnimeReducer from "../redux/AnimeSlice";
export const store=configureStore({
  reducer:{
    PortFolio:PortfolioReducer,
    Anime: AnimeReducer
  }
})
