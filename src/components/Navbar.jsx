import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const logoutUser = (event) => {
    event.preventDefault();
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="navbar bg-white shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="text-xl font-semibold text-primary">Todo App</Link>
      </div>
      <div className="flex-none gap-4">
        {user ? (
          <>
            <span className="text-gray-700 font-semibold">{user.email}</span>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt="User avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-md shadow-lg mt-3 w-52 p-2"
              >
                <li>
                  <a className="text-gray-700 hover:text-primary" onClick={logoutUser}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline text-primary border-primary hover:bg-primary hover:text-white">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline text-primary border-primary hover:bg-primary hover:text-white">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
