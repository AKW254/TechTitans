
import  React ,{ useState } from 'react';
import axios from 'axios';  
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
   /*Declare variable and their states*/
   const[email,setEmail]=useState('');
   const[password,setPassword]=useState('');
   const { login } = useAuth();
   const navigate = useNavigate();
 
   //Login function
   const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/login',
        { email, password },
        { withCredentials: true } // Enables sending/receiving cookies
      );
  
      // Update authentication states and show success message
      login({ username: response.data.username }); // Optionally pass user data
      toast.success(response.data.message);
  
      // Redirect after successful login
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred');
    }
  };
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-6 col-xl-8">
          <div className="form-signin mt-5">
            <form onSubmit={handleLogin}>
              <h1 className="h3 mb-3 fw-bolder text-center">Login</h1>

              <div className="form-floating mb-3">
                <input type="email" className="form-control rounded" id="floatingInput" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com"/>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" value ={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

               <div className="col-sm-12 col-md-8 col-xl-8 text-center">
               <button className="w-50 btn btn-md btn-primary " type="submit">
                Sign in
              </button>
                </div>            
              <div className="text-center">
                <p className="mt-3">Don't have an account? <a href="/register">Create an account</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login