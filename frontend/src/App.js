import './App.css';
import Home from './components/Home.jsx';
import {Routes, Route} from "react-router-dom"
import Login from "./components/login.jsx"
import SignUp from './components/signup.jsx';
import Dashboard from './components/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx'
import OpenRoute from './components/OpenRoute.jsx';
import VerifyEmail from './components/VerifyEmail.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import UpdatePassword from './components/UpdatePassword.jsx';

function App() {
  return (
    <div className="min-h-screen w-screen relative flex justify-center items-center bg-slate-300">
        
        <div className=" ">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/login' element={
              <OpenRoute>
                <Login/>
              </OpenRoute>
            } />
            <Route path='/signup' element={
              <OpenRoute>
                <SignUp/>
              </OpenRoute>
            } />
            <Route 
              path='/dashboard' 
              element={
                <PrivateRoute>
                  <Dashboard/>
                </PrivateRoute>
              } 
            />
            <Route
            path="/update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />

            <Route
            path="/forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />

            <Route
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />
          </Routes>

        </div>
    </div>
  );
}

export default App;