const Authenticate=async(req,res,next)=>{
  try {
    console.log("Authenticated")
  } catch (error) {
    console.log("Error While Authenticating: ",error)
    
  }

}
export default Authenticate;