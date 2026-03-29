import jwt from "jsonwebtoken";
const GenerateToken = (UserID) => {
  return jwt.sign({ id: UserID }, process.env.SECRET_KEY, { expiresIn: "1d" });
};
export default GenerateToken;

