import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import StoryPage from "../../Components/Demo/Demo";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { getUserProfileAction } from "../../Redux/User/Action";
import Auth from "../Auth/Auth";
import EditProfilePage from "../EditProfile/EditProfilePage";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";
import ReelViewer from "../ReelViewer/ReelViewer";

const Routers = () => {
  const location =useLocation();
  const reqUser = useSelector(store=>store.user.reqUser);
  const token=localStorage.getItem("token");
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getUserProfileAction(token));
 },[token])
  return (
    <div>
      {/* <div className="flex ">
      <div className="sidebarBox border border-l-slate-500 w-[20%]">
        <Sidebar />
      </div>
      
      <div className="w-[80%] ">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/p/:postId" element={<HomePage />}></Route>
          <Route path="/:username" element={<Profile />}></Route>
          <Route path="/demo" element={<StoryPage />}></Route>
          <Route path="/story/:userId" element={<Story />}></Route>
          <Route path="/account/edit" element={<EditProfilePage />}></Route>
        </Routes>
      </div>
    </div>
     */}

{(location.pathname !== "/login" && location.pathname !=="/signup")&& (
    <div className="flex">
      {location.pathname!=="/reels" && <div className="sidebarBox border border-l-slate-500 w-[20%]">
        <Sidebar />
      </div>}
      <div className="w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/p/:postId" element={<HomePage />} />
          <Route path="/p/:postId/edit" element={<HomePage />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/demo" element={<StoryPage />} />
          <Route path="/story/:userId" element={<Story />} />
          <Route path="/account/edit" element={<EditProfilePage />} />
          <Route path="/reels" element={<ReelViewer />} />
        </Routes>
      </div>
    </div>
  )}
  {(location.pathname === "/login" || location.pathname==="/signup") && (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
    </Routes>
  )}
    </div>
    
  );
};

export default Routers;
