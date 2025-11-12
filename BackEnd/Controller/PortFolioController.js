import {
  AboutMe,
  Contact,
  Education,
  Experience,
  Intro,
  Project,
} from "../Models/PortFolioModels.js";

const GetRoot = (req, res) => {
  return res.status(200).json({ msg: "U r Root is just Rocking" });
};

const PostIntro = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0)
      return res.status(400).json({
        msg: "i g u forgot to fill the fields",
        error: true,
        success: false,
      });
    const { WelcomeMSG, FName, LName, Caption, Description } = req.body;
    if (!FName || !LName || !Caption || !Description)
      return res
        .status(400)
        .json({ msg: "All Fields are required", error: true, success: false });
    // const IntroData = {};
    // if (WelcomeMSG) IntroData.WelcomeMSG = WelcomeMSG;
    // if (FName) IntroData.FName = FName;
    // if (LName) IntroData.LName = LName;
    // if (Caption) IntroData.Caption = Caption;
    // if (Description) IntroData.Description = Description;

    // const NewIntro = new Intro(IntroData);
    const NewIntro = new Intro({
      WelcomeMSG,
      FName,
      LName,
      Caption,
      Description,
    });
    const SavedIntro = await NewIntro.save();

    return res.status(200).json({
      MSG: "Intro Data has been Added Succesfully",
      Error: false,
      Success: true,
      Data: {
        Intro: SavedIntro,
        IntroID: SavedIntro._id,
      },
    });
  } catch (err) {
    console.error("Error Occured: ", err);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", Error: true, Success: false });
  }
};

const GetIntro = async (req, res) => {
  try {
    const IntroData = await Intro.find();
    // console.log("IntroData: ",IntroData)
    return res.status(200).json({
      msg: "Intro Data has been fetched Successfully",
      error: false,
      success: true,
      Data: IntroData,
    });
  } catch (error) {
    console.log("There is been Error: ", error);
    return res
      .status(400)
      .json({ msg: "internal Server Error", error: true, success: false });
  }
};

const UpdateIntro = async (req, res) => {
  try {
    const { _id, WelcomeMSG, FName, LName, Caption, Description } = req.body;
    if (!_id)
      return res.status(400).json({
        MSG: "Id has not found with the Data",
        success: false,
        error: true,
      });

    const UpadtedIntro = await Intro.findByIdAndUpdate(
      _id,
      { WelcomeMSG, FName, LName, Caption, Description },
      { new: true }
    );
    if (!UpadtedIntro)
      return res.status(404).json({
        MSG: "No Intro Found With Id Sent",
        success: false,
        error: true,
      });

    return res.status(200).json({
      MSG: "Intro has been updated successfully",
      success: true,
      error: false,
      Data: UpadtedIntro,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ MSG: "Internal Server Error", success: false, error: true });
  }
};

const PostAboutMe = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0)
      return res.status(400).json({
        msg: "i g u forgot to fill the fields",
        error: true,
        success: false,
      });
    const { Skills, Description } = req.body;
    if (!Skills || !Description)
      return res
        .status(400)
        .json({ msg: "All Fields are required", error: true, success: false });

    const NewAboutMe = new AboutMe({ Skills, Description });
    const SavedAboutMe = await NewAboutMe.save();
    return res.status(200).json({
      msg: "Successfully Posted the About Me",
      error: false,
      success: true,
      Data: { SavedAboutMe: SavedAboutMe, SavedAboutMeID: SavedAboutMe._id },
    });
  } catch (error) {
    console.log("Internal Server Error: ", error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

const GetAboutMe = async (req, res) => {
  try {
    const AboutMeData = await AboutMe.find();
    return res.status(200).json({
      msg: "Successfully Fetched the About Me Data",
      error: false,
      success: true,
      Data: AboutMeData,
    });
  } catch (error) {
    console.log("There is been Servere Error");
    return res.status(500).json({
      msg: "There is been Servere Error",
      error: true,
      success: false,
    });
  }
};

const UpdateAboutMe = async (req, res) => {
  try {
    const { _id, Description, Skills } = req.body;
    if (!_id)
      return res
        .status(400)
        .json({ MSG: "Id is required to sent", success: false, error: true });

    const UpdatedAbout = await AboutMe.findByIdAndUpdate(
      _id,
      { Description, Skills },
      { new: true }
    );
    if (!UpdatedAbout)
      return res
        .status(404)
        .json({ MSG: "About is not Found", success: false, error: true });

    return res.status(200).json({
      MSG: "About Me has been Updated Successfully",
      success: true,
      error: false,
      Data: UpdatedAbout,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ MSG: "Internal Server Error", success: false, error: true });
  }
};

const PostExperience = async (req, res) => {
  try {
    const { Period, Role, Company, Description } = req.body;
    if (!Period || !Company || !Description)
      return res
        .status(400)
        .json({ msg: "All Firlds are required", Error: true, Success: false });

    const NewExperienceData = new Experience({
      Role,
      Period,
      Company,
      Description,
    });
    const SavedExperienceData = await NewExperienceData.save();
    return res.status(200).json({
      MSG: "Experience Added Successfully",
      Error: false,
      Success: true,
      Data: SavedExperienceData,
    });
  } catch (error) {
    console.log("There is been some Error: ", error);
    return res.status(500).json({
      msg: "Internal Server Error ",
      error: true,
      success: false,
    });
  }
};

const GetExperience = async (req, res) => {
  try {
    const ExperienceData = await Experience.find();
    return res.status(200).json({
      MSG: "Experience Data Fetched Successfully",
      Error: false,
      Success: true,
      Data: ExperienceData,
    });
  } catch (error) {
    console.log("Internal Servere Error");
    return res
      .status(500)
      .json({ MSG: "There is a Internal Error", error: true, success: false });
  }
};

const UpdateExperience = async (req, res) => {
  try {
    const { _id, Period, Role, Company, Description } = req.body;
    if (!_id)
      return res
        .status(400)
        .json({ MSG: "Id is required to sent", success: false, error: true });

    const UpdatedExperience = await Experience.findByIdAndUpdate(
      _id,
      { Period, Role, Company, Description },
      { new: true }
    );
    if (!UpdatedExperience)
      return res
        .status(404)
        .json({ MSG: "Experience is not Found", success: false, error: true });

    return res.status(200).json({
      MSG: "Experience has been Successfully",
      success: true,
      error: false,
      Data: UpdatedExperience,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ MSG: "Internal Server Error", success: false, error: true });
  }
};

const DeleteExperience = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("_id: ", _id);
    if (!_id)
      return res
        .status(400)
        .json({ MSG: "Id not Found", success: false, error: true });

    const DeletedExp = await Experience.findByIdAndDelete(_id);
    if (!DeletedExp)
      return res
        .status(404)
        .json({ MSG: "Experience is not Found", success: false, error: true });
    return res.status(200).json({
      MSG: "Experience is Deleted Successfully",
      success: true,
      error: false,
      Data: DeletedExp,
    });
  } catch (error) {
    console.log("There is been Error: ", error);
    return res
      .status(500)
      .json({ MSG: "Internal Server Error", success: false, error: true });
  }
};

const PostProject = async (req, res) => {
  try {
    const { Title, ProjectDescription, ProjectImgURL } = req.body;
    console.log("req.body: ", req.body);
    if (!Title || !ProjectDescription || !ProjectImgURL)
      return res
        .status(400)
        .json({ MSG: "All Fields are Required", Error: true, Success: false });
    const NewProjectData = new Project({
      Title,
      ProjectDescription,
      ProjectImgURL,
    });
    const SavedProjectData = await NewProjectData.save();

    return res.status(200).json({
      MSG: "Project Data has been Posted Successfully",
      Error: false,
      Success: true,
      Data: SavedProjectData,
    });
  } catch (error) {
    console.log("There is been some Error: ", error);
    return res
      .status(500)
      .json({ MSG: "Internal Server Error", Error: true, Success: false });
  }
};

const GetProject = async (req, res) => {
  try {
    const ProjectsData = await Project.find();
    return res.status(200).json({
      MSG: "Projects data has been fetched Successfully",
      Error: false,
      Success: true,
      Data: ProjectsData,
    });
  } catch (error) {
    console.log("There is been Server Error: ", error);
    return res
      .status(500)
      .json({ MSG: "Internal Server Error", Error: true, Success: false });
  }
};

const DeleteProject = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id)
      return res
        .status(400)
        .json({ MSG: "Id is not Found", error: true, success: false });

    const DeletedPro = await Project.findByIdAndDelete(_id);
    console.log("DeletedPro: ", DeletedPro);
    if (!DeletedPro)
      return res.status(404).json({
        MSG: "No Record Found the perticular Id",
        error: true,
        success: false,
      });

    return res.status(200).json({
      MSG: "Project Deleted Successfully",
      success: true,
      error: false,
      Data: DeletedPro,
    });
  } catch (error) {
    console.log("There is been Error: ", error);
    return res
      .status(500)
      .json({ MSG: "There is Internal Error", error: true, success: false });
  }
};

const UpdateProject = async (req, res) => {
  try {
    const { _id, Title, ProjectDescription, ProjectImgURL } = req.body;
    if (!_id)
      return res
        .status(400)
        .json({ MSG: "Id not found", error: true, success: false });

    const UpdatedPro = await Project.findByIdAndUpdate(
      _id,
      { Title, ProjectDescription, ProjectImgURL },
      { new: true }
    );

    if (!UpdatedPro)
      return res.status(404).json({
        MSG: "No Project Found with the perticular Id ",
        error: true,
        success: false,
      });

    return res.status(200).json({
      MSG: "Project has been upated Successfully",
      error: false,
      success: true,
      Data: UpdatedPro,
    });
  } catch (error) {
    console.log("There is been some Error: ", error);
    return res
      .status(500)
      .json({ MSG: "There is a Internal Error", success: false, error: true });
  }
};

const PostEducation = async (req, res) => {
  try {
    const {
      CourseTitle,
      SchoolorCollgeName,
      StartYear,
      EndYear,
      PercentageOrCGPA,
    } = req.body;
    if (
      !CourseTitle ||
      !SchoolorCollgeName ||
      !StartYear ||
      !EndYear ||
      !PercentageOrCGPA
    )
      return res
        .status(400)
        .json({ MSG: "All Fields are Required", Error: true, Success: false });
    const NewEducationData = new Education({
      CourseTitle,
      SchoolorCollgeName,
      StartYear,
      EndYear,
      PercentageOrCGPA,
    });
    const SavedEducationData = await NewEducationData.save();

    return res.status(200).json({
      MSG: "Education Data has been Posted Successfully",
      Error: false,
      Success: true,
      Data: SavedEducationData,
    });
  } catch (error) {
    console.log("There is been some Error: ", error);
    return res
      .status(500)
      .json({ MSG: "Internal Server Error", Error: true, Success: false });
  }
};

const GetEducation = async (req, res) => {
  try {
    const EducationData = await Education.find();
    return res.status(200).json({
      MSG: "Education data has been fetched Successfully",
      Error: false,
      Success: true,
      Data: EducationData,
    });
  } catch (error) {
    console.log("There is been Server Error: ", error);
    return res
      .status(500)
      .json({ MSG: "Internal Server Error", Error: true, Success: false });
  }
};

const UpdateEducation = async (req, res) => {
  try {
    const {
      _id,
      CourseTitle,
      SchoolorCollgeName,
      StartYear,
      EndYear,
      PercentageOrCGPA,
    } = req.body;
    if (!_id)
      return res
        .status(400)
        .json({ MSG: "Id is not found", error: true, success: false });
    const UpdatedEdu = await Education.findByIdAndUpdate(
      _id,
      { CourseTitle, SchoolorCollgeName, StartYear, EndYear, PercentageOrCGPA },
      { new: true }
    );
    if (!UpdatedEdu)
      return res
        .status(404)
        .json({ MSG: "Education is not found", error: true, success: false });

    return res.status(200).json({
      MSG: "Education is Updated Successfully",
      success: true,
      error: false,
      Data: UpdatedEdu,
    });
  } catch (error) {
    console.log("There is been some Error: ", error);
    return res
      .status(500)
      .json({ MSG: "Internal Server Error", success: false, error: true });
  }
};

const DeleteEducation = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id)
      return res
        .status(400)
        .json({ MSG: "Id is not found", error: true, success: false });

    const DeletedEdu = await Education.findByIdAndDelete(_id);

    if (!DeletedEdu)
      return res.status(404).json({
        MSG: "Education is not found which u want to Delete",
        success: false,
        error: true,
      });

    return res.status(200).json({
      MSG: "Education is deleted Successfully",
      error: false,
      success: true,
      Data: DeletedEdu,
    });
  } catch (error) {
    console.log("Theer is been some Error : ", error);
    return res
      .status(500)
      .json({ MSG: "Internal Server Error", success: false, error: true });
  }
};

const PostContact = async (req, res) => {
  try {
    const { Name, Age, Gender, Email, Mobile, Country } = req.body;
    if (!Name || !Age || !Gender || !Email || !Mobile || !Country)
      return res
        .status(400)
        .json({ MSG: "All Fields are Required", Error: true, Success: false });
    const NewContactData = new Contact({
      Name,
      Age,
      Gender,
      Email,
      Mobile,
      Country,
    });
    const SavedContactData = await NewContactData.save();

    return res.status(200).json({
      MSG: "Contact Data has been Posted Successfully",
      Error: false,
      Success: true,
      Data: SavedContactData,
    });
  } catch (error) {
    console.log("There is been some Error: ", error);
    return res
      .status(500)
      .json({ MSG: "Internal Server Error", Error: true, Success: false });
  }
};

const GetContact = async (req, res) => {
  try {
    const ContactData = await Contact.find();
    return res.status(200).json({
      MSG: "Contact data has been fetched Successfully",
      Error: false,
      Success: true,
      Data: ContactData,
    });
  } catch (error) {
    console.log("There is been Server Error: ", error);
    return res
      .status(500)
      .json({ MSG: "Internal Server Error", Error: true, Success: false });
  }
};

const UpdateContact = async (req, res) => {
  try {
    const {_id, Name, Age, Gender, Email, Mobile, Country } = req.body;
    if (!_id)
      return res
        .status(400)
        .json({ MSG: "Id is not found", error: true, success: false });

    const UpdatedContact = await Contact.findByIdAndUpdate(
      _id,
      { Name, Age, Gender, Email, Mobile, Country },
      { new: true }
    );

    if (!UpdatedContact)
      return res.status(404).json({
        MSG: "No Contact Found With that Specific Id",
        error: true,
        success: false,
      });

    return res.status(200).json({
      MSG: "Conatct Data is Upadted Successfully",
      success: true,
      error: false,
      Data: UpdatedContact,
    });
  } catch (error) {
    console.log("There is been some Error Occured ", error);
    return res
      .status(500)
      .json({
        MSG: "There is been some Internal Error",
        error: true,
        success: false,
      });
  }
};

export {
  GetRoot,
  PostIntro,
  GetIntro,
  PostAboutMe,
  GetAboutMe,
  PostExperience,
  GetExperience,
  PostProject,
  GetProject,
  PostEducation,
  GetEducation,
  PostContact,
  GetContact,
  UpdateIntro,
  UpdateAboutMe,
  UpdateExperience,
  DeleteExperience,
  UpdateEducation,
  DeleteEducation,
  DeleteProject,
  UpdateProject,
  UpdateContact,
};
