import express from "express";
const Router = express.Router();
// import getRoot from "../Controller/"
import {
  DeleteEducation,
  DeleteExperience,
  DeleteProject,
  GetAboutMe,
  GetContact,
  GetEducation,
  GetExperience,
  GetIntro,
  GetProject,
  GetRoot,
  PostAboutMe,
  PostContact,
  PostEducation,
  PostExperience,
  PostIntro,
  PostProject,
  UpdateAboutMe,
  UpdateContact,
  UpdateEducation,
  UpdateExperience,
  UpdateIntro,
  UpdateProject,
} from "../Controller/PortFolioController.js";

Router.get("/", GetRoot);
Router.post("/PostIntro", PostIntro);
Router.get("/GetIntro", GetIntro);
Router.put("/UpdateIntro", UpdateIntro);
Router.post("/PostAboutMe", PostAboutMe);
Router.get("/GetAboutMe", GetAboutMe);
Router.put("/UpdateAboutMe", UpdateAboutMe);
Router.post("/PostExperience", PostExperience);
Router.get("/GetExperience", GetExperience);
Router.put("/UpdateExperience", UpdateExperience);
Router.delete("/DeleteExperience/:_id", DeleteExperience);
Router.post("/PostProject", PostProject);
Router.get("/GetProject", GetProject);
Router.delete("/DeleteProject/:_id", DeleteProject);
Router.put("/UpdateProject", UpdateProject);
Router.post("/PostEducation", PostEducation);
Router.get("/GetEducation", GetEducation);
Router.put("/UpdateEducation", UpdateEducation);
Router.delete("/DeleteEducation/:_id", DeleteEducation);
Router.post("/PostContact", PostContact);
Router.get("/GetContact", GetContact);
Router.put("/UpdateContact", UpdateContact);

export default Router;
