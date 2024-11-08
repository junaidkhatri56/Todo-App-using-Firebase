import React, { useRef, useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';

const Register = () => {

const email = useRef();
const password = useRef();
const userName =useRef();
const navigate = useNavigate();
const [error, setError] = useState('')

const registerUser = (event)=>{
  event.preventDefault();

  createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    navigate('/login')
  })
  .catch((error) => {
    const errorMessage = error.message;
    setError(errorMessage)
  });


  userName.current.value = ''
  email.current.value = ''
  password.current.value = ''

}


  return  (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-center text-primary mb-6">Create an Account</h2>
        <p>{error}</p>
        
        {/* Register Form */}
        <form className="space-y-4" onSubmit={registerUser}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full"
              ref={userName}
              required
            />
          </div>
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
          <button type="submit" className="btn btn-primary w-full mt-4">Sign Up</button>
        </form>

        {/* Additional Options */}
        <div className="text-center mt-6">
          <span className="text-sm">Already have an account? </span>
          <Link to="/login" className="link link-primary link-hover text-sm">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register