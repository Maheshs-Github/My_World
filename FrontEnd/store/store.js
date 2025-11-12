import { configureStore } from "@reduxjs/toolkit";
import PortfolioReducer  from "../redux/PortfolioSlice";
export const store=configureStore({
  reducer:{
    PortFolio:PortfolioReducer 
  }
})