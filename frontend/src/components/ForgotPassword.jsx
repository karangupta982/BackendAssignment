import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import {toast} from "react-hot-toast"
import { endpoints } from "../Services/apis";
import { apiConnector } from "../Services/apiConnector";

import { useForm } from "react-hook-form";

const {RESETPASSTOKEN_API} = endpoints;

function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitSuccessful },
  } = useForm()


  const handleOnSubmit = async(data) => {
   

    

    const toastId = toast.loading("Loading...")
  
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email:data.email,
      })

      console.log("RESETPASSTOKEN RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      setEmailSent(true)
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error)
      toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId)
 

  }

  useEffect(()=>{
    if(isSubmitSuccessful){
        reset({
            newPassword:"",
            confirmNewPassword:"",
        })
    }
}, [reset, isSubmitSuccessful])

  
  return (
    <div className="flex flex-col gap-7 text-center h-[50vh] w-[90vw] md:w-[50vw] bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 border border-gray-100">
      
        <div className="max-w-[500px] p-4 lg:p-8 m-auto">
          <h1 className="text-[4vh] font-semibold my-[2vh] ">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
         
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            {!emailSent && (
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-2xl font-normal">
                       Email Address
                  </label>
                  <input type="email" name="email" id="email"
                  className="p-[0.7rem] rounded" placeholder="Enter email address"
                  {...register("email", {required:true})}
                  />
                  {
                      errors.password && (
                          <span className="-mt-1 text-[12px] text-red-950">
                              !Enter Email address.
                          </span>
                          )
                  }
            </div>
            )}
            <button
              type="submit"
              className="px-[0.6rem] py-[0.3rem]  text-center  text-2xl font-semibold rounded bg-slate-300 mt-[4vh] "
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-[4vh]    ">
            <Link to="/login">
              <p className=" py-[0.3vh] mx-auto w-fit  px-[1vw] text-2xl font-semibold rounded bg-slate-300 ">
                Login
              </p>
            </Link>
          </div>
        </div>
      {/* )} */}
    </div>
  )
}

export default ForgotPassword
