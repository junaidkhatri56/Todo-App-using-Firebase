import React, { useRef, useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';

const Login = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState('')

  const loginUser = (event) =>{
    event.preventDefault();

    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    navigate('/');
  })
  .catch((error) => {
    const errorMessage = error.message;
    setError(errorMessage)
  });

    email.current.value = ''
    password.current.value = ''
      
  }


  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          {/* Header */}
          <h2 className="text-2xl font-semibold text-center text-primary mb-6">Welcome Back</h2>
          <p>{error}</p>
          
          {/* Login Form */}
          <form className="space-y-4" onSubmit={loginUser}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                ref={email}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                ref={password}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full mt-4">Login</button>
          </form>
  
          {/* Additional Options */}
          <div className="text-center mt-6">
            <a href="/forgot-password" className="link link-hover text-sm">Forgot Password?</a>
          </div>
          <div className="text-center mt-2">
            <span className="text-sm">Don't have an account? </span>
            <Link to="/register" className="link link-primary link-hover text-sm">Register</Link>
          </div>
        </div>
      </div>
  )
}

export default Login