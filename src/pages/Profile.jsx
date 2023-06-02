import React, { useContext,useEffect } from "react";
import { Context } from "../index";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { server } from "../index";

const Profile = () => {
  const { isAuthenticated, loading, user ,setIsAuthenticated,setLoading,setUser} = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);
  return(<>
    {

            !loading?
            <div>
            <h1 style={{textAlign:"center"}}>{user?.name}</h1>
            <p style={{textAlign:"center"}}>{user?.email}</p>
          </div>
          :""
        } 



  </>)
};

export default Profile;
