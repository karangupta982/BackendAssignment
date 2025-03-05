import {toast} from "react-hot-toast"
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const token = localStorage.getItem("token")

  if (token !== null) {
    return children
  } else {
    toast.error("You are not logged in. Please Login first.")
    return <Navigate to="/login" />
  }
}


export default PrivateRoute;