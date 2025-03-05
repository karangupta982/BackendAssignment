import { useEffect, useState } from "react"
import {toast} from "react-hot-toast"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { endpoints } from "../Services/apis";
import {apiConnector} from "../Services/apiConnector"

import { useForm } from "react-hook-form"




const {RESETPASSWORD_API} = endpoints;


function UpdatePassword() {

    const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const location = useLocation()

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitSuccessful },
} = useForm()





  const submitForm = async (data)=>{

    const token = location.pathname.split("/").at(-1)


    const toastId = toast.loading("Loading...")
    
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password:data.newPassword,
        confirmPassword:data.confirmNewPassword,
        token,
      })

      // console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      navigate("/login")
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
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
    <div className=" bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 border border-gray-100 flex justify-center items-center">
     
     
        <div className="max-w-[500px] p-4 lg:p-8">
         

            <h1 className="text-center text-4xl mt-[2vh]">
                <span className="font-bold text-5xl">U</span>
                <span className="font-thin">PD</span>
                <span className="font-bold">AT</span>
                <span className="font-thin text-5xl">E</span>
                <span className="font-thin text-5xl"> PA</span>
                <span className="font-bold">SS</span>
                <span className="font-thin text-5xl">WOR</span>
                <span className="font-bold text-5xl">D</span>
            </h1>

            <form className="mx-[2vw] my-[3vh] flex flex-col gap-7 text-left" onSubmit={handleSubmit(submitForm)}>
                <div className="flex flex-col gap-2">

                    <div className="flex flex-col gap-1">
                        <label htmlFor="newPassword" className="text-2xl font-normal">
                            New Password
                        </label>
                        <input type="password" name="newPassword" id="newPassword"
                        className="p-[0.7rem] rounded" placeholder="Enter 6 digit Password"
                        {...register("newPassword", { 
                            required: "Password is required", 
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                        />
                        {
                            errors.password && (
                                <span className="-mt-1 text-[12px] text-red-950">
                                    !Please Enter 6 Digit Password.
                                </span>
                                )
                        }
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmNewPassword" className="text-2xl font-normal">
                           Confirm New Password
                        </label>
                        <input type="password" name="confirmNewPassword" id="confirmNewPassword"
                        className="p-[0.7rem] rounded" placeholder="Enter 6 digit Password"
                        {...register("confirmNewPassword", { 
                            required: "Password is required", 
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                        />
                        {
                            errors.password && (
                                <span className="-mt-1 text-[12px] text-red-950">
                                    !Please Enter 6 Digit Password.
                                </span>
                                )
                        }
                    </div>

                    <div className="text-center">
                        <button className="px-[0.6rem] py-[0.3rem]  text-center  text-2xl font-semibold rounded bg-slate-300 mt-[4vh]  " type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
                    </div>
                </div>

                <Link to="/login" className="text-center">
                    <button className="px-[0.6rem] py-[0.3rem] text-2xl font-semibold rounded bg-slate-300 ">Login</button>
                </Link>
            </form>

        </div>
     
    </div>


  )
}

export default UpdatePassword
