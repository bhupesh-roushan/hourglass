// import React, { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import useGetUserProfile from "@/hooks/useGetUserProfile";
// import { Link, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { AtSign, Heart, MessageCircle } from "lucide-react";
// import { toast } from "sonner";
// import axios from "axios";

// const Profile = () => {
//   const params = useParams();
//   const userId = params.id;
//   useGetUserProfile(userId);
//   const [activeTab, setActiveTab] = useState("posts");
//   const { userProfile, user } = useSelector((store) => store.auth);
//   const isLoggedInUserProfile = user?._id === userProfile?._id;

//   const isFollowing = user?.following.includes(userProfile?._id);
//   console.log(isFollowing);

//   const followOrUnfollowHandler = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8000/api/v1/user/followOrUnfollow/${user?._id}`, { withCredentials: true });
//       console.log(res.data);
//       if (res.data.success) {
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   }

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const displayedPost =
//     activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

//   return (
//     <div className="bg-black h-screen ">
//       <div className="bg-black  ">
//         <div className="flex max-w-5xl justify-center mx-auto pl-10 bg-black text-white w-full">
//           <div className="flex flex-col gap-20 p-8">
//             <div className="grid grid-cols-2 ">
//               <section className="flex items-center justify-center">
//                 <Avatar className="h-32 w-32 shadow-md shadow-blue-300 border-4 border-gray-200">
//                   <AvatarImage
//                     src={userProfile?.profilePicture}
//                     alt="profilephoto"
//                   />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//               </section>
//               <section>
//                 <div className="flex flex-col gap-5">
//                   <div className="flex items-center w-full gap-10">
//                     <span className="font-bold text-xl">
//                       {userProfile?.username}
//                     </span>
//                     {isLoggedInUserProfile ? (
//                       <>
//                         <Link to="/account/edit">
//                           <Button
//                             variant="secondary"
//                             className="hover:bg-gray-200 h-8"
//                           >
//                             Edit profile
//                           </Button>
//                         </Link>
//                       </>
//                     ) : isFollowing ? (
//                       <>
//                         <Button onClick={followOrUnfollowHandler} variant="secondary" className="h-8">
//                           Unfollow
//                         </Button>
//                         <Button variant="secondary" className="h-8">
//                           Message
//                         </Button>
//                       </>
//                     ) : (
//                       <Button onClick={followOrUnfollowHandler} className="bg-[#0095F6] hover:bg-[#3192d2] h-8">
//                         Follow
//                       </Button>
//                     )}
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <p>
//                       <span className="font-semibold">
//                         {userProfile?.posts.length}{" "}
//                       </span>
//                       posts
//                     </p>
//                     <p>
//                       <span className="font-semibold">
//                         {userProfile?.followers.length}{" "}
//                       </span>
//                       followers
//                     </p>
//                     <p>
//                       <span className="font-semibold">
//                         {userProfile?.following.length}{" "}
//                       </span>
//                       following
//                     </p>
//                   </div>
//                   <div className="flex flex-col gap-1">
//                     <span className="font-semibold">
//                       {userProfile?.bio || "bio here..."}
//                     </span>
//                     <Badge className="w-fit" variant="secondary">
//                       <AtSign size={12} />{" "}
//                       <span className="pl-1">{userProfile?.username}</span>{" "}
//                     </Badge>
//                     <div className="flex gap-2">
//                       <span className="hover:text-blue-600">
//                         <a
//                           href="https://www.linkedin.com/in/roushanb"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           🐶 LinkedIn
//                         </a>
//                       </span>
//                       <span className="hover:text-blue-700">
//                         <a
//                           href="https://github.com/bhupesh-roushan"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           🐰 Github
//                         </a>
//                       </span>
//                       <span className="hover:text-blue-600">
//                         <a
//                           href="https://www.instagram.com/roushanwa"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           🐴 Instagram
//                         </a>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </section>
//             </div>
//             <div className="border-t border-t-gray-200 ">
//               <div className="flex items-center justify-center gap-10 text-sm ">
//                 <span
//                   className={`py-3 cursor-pointer ${
//                     activeTab === "posts" ? "font-bold" : ""
//                   }`}
//                   onClick={() => handleTabChange("posts")}
//                 >
//                   POSTS
//                 </span>
//                 <span
//                   className={`py-3 cursor-pointer  ${
//                     activeTab === "saved" ? "font-bold" : ""
//                   }`}
//                   onClick={() => handleTabChange("saved")}
//                 >
//                   SAVED
//                 </span>
//               </div>
//               <div className="grid grid-cols-3 gap-3 ">
//                 {displayedPost?.map((post) => {
//                   return (
//                     <div
//                       key={post?._id}
//                       className="relative group cursor-pointer shadow-sm shadow-gray-500 border-2 border-white rounded-md my-5"
//                     >
//                       <img
//                         src={post.image}
//                         alt="postimage"
//                         className="rounded-sm  w-full aspect-square object-cover"
//                       />
//                       <div className="absolute  rounded-sm inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         <div className="flex items-center text-white space-x-4">
//                           <button className="flex items-center gap-2 hover:text-gray-300">
//                             <Heart />
//                             <span>{post?.likes.length}</span>
//                           </button>
//                           <button className="flex items-center gap-2 hover:text-gray-300">
//                             <MessageCircle />
//                             <span>{post?.comments.length}</span>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { setUserProfile, updateUserFollowing } from "@/redux/authSlice"; // Redux action to update user state
import { use } from "react";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("posts");
  const { userProfile, user } = useSelector((store) => store.auth);
  const [follow,setFollow] = useState(false);
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  

  useEffect(() => {
    if (user?.following.includes(userProfile?._id)) {
      setFollow(true);
    }
  }, [user?.following]);

  const followOrUnfollowHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/followOrUnfollow/${userProfile?._id}`,
        {},
        { withCredentials: true }
        
      );
      if (res.data.success) {
        toast.success(res.data.message);
        // Dispatch action to update Redux state
        dispatch(updateUserFollowing(userProfile?._id));
        setFollow(!follow);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="bg-black h-screen">
      <div className="bg-black">
        <div className="flex items-center justify-center  bg-black text-white w-full">
          <div className="flex mt-24 md:mt-5 text-sm flex-col gap-20 p-5 md:p-8 items-center justify-center">
            <div className=" flex flex-col gap-5 md:grid grid-cols-2">
              <section className="flex  items-center justify-center">
                <Avatar className=" w-20 h-20 md:h-32 md:w-32 shadow-md shadow-blue-300 border-4 border-gray-200">
                  <AvatarImage
                    src={userProfile?.profilePicture}
                    alt="profilephoto"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </section>
              <section>
                <div className="flex flex-col items-center justify-center gap-5">
                  <div className="flex items-center w-full gap-10">
                    <span className="font-bold text-sm md:text-xl">
                      {userProfile?.username}
                    </span>
                    {isLoggedInUserProfile ? (
                      <Link to="/account/edit">
                        <Button
                          variant="secondary"
                          className="hover:bg-gray-200 h-8"
                        >
                          Edit profile
                        </Button>
                      </Link>
                    ) : follow ? (
                      <Button
                        onClick={followOrUnfollowHandler}
                        variant="secondary"
                        className="h-8"
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        onClick={followOrUnfollowHandler}
                        className="bg-[#0095F6] hover:bg-[#3192d2] h-8"
                      >
                        Follow
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center  w-full gap-5">
                    <p>
                      <span className="font-semibold">
                        {userProfile?.posts.length}{" "}
                      </span>
                      posts
                    </p>
                    <p>
                      <span className="font-semibold">
                        {userProfile?.followers?.length}{" "}
                      </span>
                      followers
                    </p>
                    <p>
                      <span className="font-semibold">
                        {userProfile?.following.length}{" "}
                      </span>
                      following
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">
                      {userProfile?.bio || "bio here..."}
                    </span>
                    <Badge className="w-fit" variant="secondary">
                      <AtSign size={12} />{" "}
                      <span className="pl-1">{userProfile?.username}</span>{" "}
                    </Badge>
                    <div className="flex gap-2">
                      <span className="hover:text-blue-600">
                        <a
                          href="https://www.linkedin.com/in/roushanb"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🐶 LinkedIn
                        </a>
                      </span>
                      <span className="hover:text-blue-700">
                        <a
                          href="https://github.com/bhupesh-roushan"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🐰 Github
                        </a>
                      </span>
                      <span className="hover:text-blue-600">
                        <a
                          href="https://www.instagram.com/roushanwa"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🐴 Instagram
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="border-t border-t-gray-200 max-w-2xl">
              <div className="flex items-center justify-center gap-10 text-sm">
                <span
                  className={`py-3 cursor-pointer ${
                    activeTab === "posts" ? "font-bold" : ""
                  }`}
                  onClick={() => handleTabChange("posts")}
                >
                  POSTS
                </span>
                <span
                  className={`py-3 cursor-pointer ${
                    activeTab === "saved" ? "font-bold" : ""
                  }`}
                  onClick={() => handleTabChange("saved")}
                >
                  SAVED
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {displayedPost?.map((post) => {
                  return (
                    <div
                      key={post?._id}
                      className="relative group cursor-pointer shadow-sm shadow-gray-500 border-2 border-white rounded-md my-5"
                    >
                      <img
                        src={post.image}
                        alt="postimage"
                        className="rounded-sm w-full aspect-square object-cover"
                      />
                      <div className="absolute rounded-sm inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center text-white space-x-4">
                          <button className="flex items-center gap-2 hover:text-gray-300">
                            <Heart />
                            <span>{post?.likes.length}</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-gray-300">
                            <MessageCircle />
                            <span>{post?.comments.length}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
