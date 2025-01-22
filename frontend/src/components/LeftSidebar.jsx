// import {
//   Heart,
//   Home,
//   LogOut,
//   MessageCircle,
//   PlusSquare,
//   Search,
//   TrendingUp,
// } from "lucide-react";
// import React, { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { toast } from "sonner";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setAuthUser } from "@/redux/authSlice";
// import CreatePost from "./CreatePost";
// import { setPosts, setSelectedPost } from "@/redux/postSlice";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { Button } from "./ui/button";

// import hourglassHomeLogo from "/Users/roro/Desktop/hourglass/frontend/src/assets/hourglassHomeLogo.svg";

// const LeftSidebar = () => {
//   const navigate = useNavigate();
//   const { user } = useSelector((store) => store.auth);
//   const { likeNotification } = useSelector(
//     (store) => store.realTimeNotification
//   );
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setAuthUser(null));
//         dispatch(setSelectedPost(null));
//         dispatch(setPosts([]));
//         navigate("/login");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const sidebarHandler = (textType) => {
//     if (textType === "Logout") {
//       logoutHandler();
//     } else if (textType === "Create") {
//       setOpen(true);
//     } else if (textType === "Profile") {
//       navigate(`/profile/${user?._id}`);
//     } else if (textType === "Home") {
//       navigate("/");
//     } else if (textType === "Messages") {
//       navigate("/chat");
//     }
//   };

//   const sidebarItems = [
//     { icon: <Home />, text: "Home" },
//     { icon: <Search />, text: "Search" },
//     { icon: <TrendingUp />, text: "Explore" },
//     { icon: <MessageCircle />, text: "Messages" },
//     { icon: <Heart />, text: "Notifications" },
//     { icon: <PlusSquare />, text: "Create" },
//     {
//       icon: (
//         <Avatar className="w-6 h-6">
//           <AvatarImage src={user?.profilePicture} alt="@shadcn" />
//           <AvatarFallback>CN</AvatarFallback>
//         </Avatar>
//       ),
//       text: "Profile",
//     },
//     { icon: <LogOut />, text: "Logout" },
//   ];
//   return (
//     <div className="fixed top-0 z-10 left-0  shadow-lg shadow-gray-500  w-[16%] h-screen  text-white bg-black">
//       <div className="flex flex-col">
//         <div className=" flex w-full bg-black  border-b border-gray-500 p-2    items-center mb-3 justify-center gap-3 mt-2">
//           <Avatar>
//             <AvatarImage src={user?.profilePicture} alt="post_image" />
//             <AvatarFallback>HG</AvatarFallback>
//           </Avatar>
//           <p className="font-bold text-xl"> {user?.username}</p>
//         </div>

//         <div className="absolute w-full bottom-5 flex flex-col items-center text-center justify-center gap-5">
//           <img src={hourglassHomeLogo} alt="logo" className="mt-3  pl-3 h-8 " />
//           <p className="text-center text-gray-500 text-xs font-light">
//             CAPTURING MOMENTS
//           </p>
//         </div>
//         <div>
//           {sidebarItems.map((item, index) => {
//             return (
//               <div
//                 onClick={() => sidebarHandler(item.text)}
//                 key={index}
//                 className="flex items-center gap-3 relative hover:bg-black cursor-pointer  p-3 my-3 hover:shadow-md hover:shadow-gray-500 hover:text-lg transition-all duration-300"
//               >
//                 {item.icon}
//                 <span>{item.text}</span>
//                 {item.text === "Notifications" &&
//                   likeNotification.length > 0 && (
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <Button
//                           size="icon"
//                           className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
//                         >
//                           {likeNotification.length}
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent>
//                         <div>
//                           {likeNotification.length === 0 ? (
//                             <p>No new notification</p>
//                           ) : (
//                             likeNotification.map((notification) => {
//                               return (
//                                 <div
//                                   key={notification.userId}
//                                   className="flex items-center gap-2 my-2"
//                                 >
//                                   <Avatar>
//                                     <AvatarImage
//                                       src={
//                                         notification.userDetails?.profilePicture
//                                       }
//                                     />
//                                     <AvatarFallback>CN</AvatarFallback>
//                                   </Avatar>
//                                   <p className="text-sm">
//                                     <span className="font-bold">
//                                       {notification.userDetails?.username}
//                                     </span>{" "}
//                                     liked your post
//                                   </p>
//                                 </div>
//                               );
//                             })
//                           )}
//                         </div>
//                       </PopoverContent>
//                     </Popover>
//                   )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <CreatePost open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default LeftSidebar;
import React, { useState } from "react";
import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

import hourglassHomeLogo from "/Users/roro/Desktop/hourglass/frontend/src/assets/hourglassHomeLogo.svg";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      setOpen(true);
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Messages") {
      navigate("/chat");
    }
    setIsSidebarOpen(false); // Close sidebar on item click
  };

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 z-50 left-0 shadow-lg shadow-gray-500 w-[75%] md:w-[16%] h-screen text-white bg-black transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col">
          <div className="flex w-full bg-black border-b border-gray-500 p-2 items-center mb-3 justify-center gap-3 mt-2">
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="post_image" />
              <AvatarFallback>HG</AvatarFallback>
            </Avatar>
            <p className="font-bold text-xl"> {user?.username}</p>
          </div>

          <div>
            {sidebarItems.map((item, index) => (
              <div
                onClick={() => sidebarHandler(item.text)}
                key={index}
                className="flex items-center gap-3 relative hover:bg-black cursor-pointer p-3 my-3 hover:shadow-md hover:shadow-gray-500 hover:text-lg transition-all duration-300"
              >
                {item.icon}
                <span>{item.text}</span>
                {item.text === "Notifications" &&
                  likeNotification.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size="icon"
                          className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
                        >
                          {likeNotification.length}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div>
                          {likeNotification.length === 0 ? (
                            <p>No new notification</p>
                          ) : (
                            likeNotification.map((notification) => (
                              <div
                                key={notification.userId}
                                className="flex items-center gap-2 my-2"
                              >
                                <Avatar>
                                  <AvatarImage
                                    src={
                                      notification.userDetails?.profilePicture
                                    }
                                  />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p className="text-sm">
                                  <span className="font-bold">
                                    {notification.userDetails?.username}
                                  </span>{" "}
                                  liked your post
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
              </div>
            ))}
          </div>

          <div className="absolute w-full bottom-5 flex flex-col items-center text-center justify-center gap-5">
            <img
              src={hourglassHomeLogo}
              alt="logo"
              className="mt-3 pl-3 h-8"
            />
            <p className="text-center text-gray-500 text-xs font-light">
              CAPTURING MOMENTS
            </p>
          </div>
        </div>
        <CreatePost open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default LeftSidebar;
