import mongoose from "mongoose";

const IntroSchema = new mongoose.Schema({
  WelcomeMSG: {
    type: String,
    required: true,
    default:"Hello There, I am"
  },
  FName: {
    type: String,
    required: true,
  },
  LName: {
    type: String,
    required: true,
  },
  Caption: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
});

const AboutMeSchema = new mongoose.Schema({
  Description: {
    type: String,
    required: true,
  },
  Skills: {
    type: Array,
    required: true,
  },
});

const ExperienceSchema = new mongoose.Schema({
  Period: {
    type: String,
    required: true,
  },
  Role:{
    type:String,
    required:true,
  },
  Company: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
});

const ProjectSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  // ProjectSummary: {
  //   type: String,
  //   required: true,
  // },
  ProjectDescription: {
    type: String,
    required: true,
  },
  ProjectImgURL: {
    type: String,
    required: true,
  },
});

// const CourseSchema = new mongoose.Schema({
//   Title: {
//     type: String,
//     required: true,
//   },
//   CourseSummary: {
//     type: String,
//     required: true,
//   },
//   CourseDescription: {
//     type: String,
//     required: true,
//   },
//   CourseImgURL: {
//     type: String,
//     required: true,
//   },
// });

const EducationSchema = new mongoose.Schema({
  CourseTitle: {
    type: String,
    required: true,
  },
  SchoolorCollgeName: {
    type: String,
    required: true,
  },
  StartYear: {
    type: Number,
    required: true,
  },
    EndYear: {
    type: Number,
    required: true,
  },
  PercentageOrCGPA: {
    type: Number,
    required: true,
  },
});

const ContactSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Mobile: {
    type: Number,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  lottieImgURL: {
    type: String,
    required: true,
  },
});

export const Intro = mongoose.model("Intros", IntroSchema);
export const AboutMe = mongoose.model("AboutMes", AboutMeSchema);
export const Experience = mongoose.model("Experiences", ExperienceSchema);
export const Project = mongoose.model("Projects", ProjectSchema);
// export const Course = mongoose.model("Courses", CourseSchema);
export const Education = mongoose.model("Educations", EducationSchema);
export const Contact = mongoose.model("Contacts", ContactSchema);

// export { Intro, AboutMe, Experience, Project, Course, Contact };
