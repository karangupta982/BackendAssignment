import { useEffect,  useState } from "react"
import { toast } from "react-hot-toast"
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { endpoints } from "../Services/apis";
import { apiConnector } from "../Services/apiConnector";

const {SIGNUP_API} = endpoints;

function VerifyEmail() {
 
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();


    const location = useLocation()
    const userData = location.state?.userData

  useEffect(() => {
    if (!userData) {
      navigate("/signup");
    }
  }, []);

  const handleVerifyAndSignup = async(e) => {
    e.preventDefault();
    const {
     userName,
     email,
     password,
    } = userData;

   
    const toastId = toast.loading("Loading...");
    
    try{
        const response = await apiConnector("POST",SIGNUP_API,
            {
                userName,
                email,
                password,
                otp,
            }
        )
        console.log("SIGNUP API RESPONSE............", response)

        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Sign Up Successful")
        navigate("/login")
    }
    catch(error){
        console.log("SIGNUP API ERROR............", error)
        toast.error("Sign Up Failed")
        navigate("/signup")
    }
    toast.dismiss(toastId)

    
  };

  return (
  
    <div className="min-h-screen relative">
    <div className="relative top-[48vh] left-[48vw]"></div>
    
    <div className="relative z-10 min-h-screen flex items-center justify-center">
      
        <div className=" max-w-[500px] p-4 lg:p-8    shadow-xl  h-full w-full bg-slate-800 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-50 border border-gray-100">
          <h1 className=" font-semibold text-[4vh] text-center ">Verify Email</h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 ">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0  rounded-[0.5rem]  aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50 transition-all duration-200"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-slate-300 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium  transition-all duration-200"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link
              to="/signup"
              className=" flex items-center gap-x-2 hover:text-yellow-50 transition-colors duration-200"
            >
             Back To Signup
            </Link>
           
          </div>
        </div>
    </div>

    
  </div>
  
  );
}

export default VerifyEmail;















