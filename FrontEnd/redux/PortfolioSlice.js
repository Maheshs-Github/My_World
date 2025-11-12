import { createSlice } from "@reduxjs/toolkit";

const PortfolioSlice = createSlice({
  name: "PortFolio",
  initialState: {
    Intro: {},
    AboutMe: {},
    Experiences: [],
    Projects: [],
    Education: [],
    Contact: {},
  },
  reducers: {
    setIntro: (state, action) => {
      state.Intro = action.payload;
    },
    setAboutMe: (state, action) => {
      state.AboutMe = action.payload;
    },
    setExperiences: (state, action) => {
      state.Experiences = action.payload;
    },
    setProjects: (state, action) => {
      state.Projects = action.payload;
    },
    setEducation: (state, action) => {
      state.Education = action.payload;
    },
    setContact: (state, action) => {
      state.Contact = action.payload;
    },
  },
});

export const {
  setIntro,
  setAboutMe,
  setExperiences,
  setEducation,
  setProjects,
  setContact,
} = PortfolioSlice.actions;
export default PortfolioSlice.reducer;
