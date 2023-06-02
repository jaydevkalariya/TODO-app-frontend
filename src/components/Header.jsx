import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context, server } from "../index";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
   

<nav  class="navbar bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
<div class="container-fluid">
  <a class="navbar-brand" href="#">TODO app</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
      <Link to={"/"} class="nav-link active">  Home</Link>
      </li>
      {isAuthenticated?(
        <>
      <li class="nav-item">
      <Link to={"/profile"} class="nav-link active"> Profile</Link>
      </li>
      
      <Link to={"/login"} class="nav-link active" onClick={logoutHandler}>Logout</Link>
    </>):<Link to={"/login"} class="nav-link active">Login</Link>
    
    }
    
      
        
      
    </ul>
  </div>
</div>
</nav>
  );
};

export default Header;
