// import React from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom';
// import SuggestedUsers from './SuggestedUsers';

// const RightSidebar = () => {
//   const { user } = useSelector(store => store.auth);
//   return (
//     <div className='w-fit h-full my-10 pr-32 mr-5 rounded-lg p-5 shadow-md shadow-gray-500'>
//       <div className='flex items-center gap-2'>
//         <Link to={`/profile/${user?._id}`}>
//           <Avatar >
//             <AvatarImage src={user?.profilePicture} alt="post_image"  />
//             <AvatarFallback>HG</AvatarFallback>
//           </Avatar>
//         </Link>
//         <div>
//           <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
//           <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
//         </div>
//       </div>
//       <SuggestedUsers/>
//     </div>
//   )
// }

// export default RightSidebar

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";
import { FaGripLines, FaHamburger } from "react-icons/fa";
// You can use any 3-line icon here

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>
      {/* Hamburger Icon to Show/Hide Right Sidebar */}
      <button
        className="fixed top-5 right-5 z-20 p-2 text-white bg-black rounded-full"
        onClick={toggleSidebar}
      >
        <FaGripLines className="w-6 h-6" />
      </button>

      {/* Right Sidebar */}
      {sidebarVisible && (
        <div className="mt-32 mr-10 p-5">
          <div className="flex items-center gap-2">
            <Link to={`/profile/${user?._id}`}>
              <Avatar>
                <AvatarImage src={user?.profilePicture} alt="post_image" />
                <AvatarFallback>HG</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h1 className="font-semibold text-sm">
                <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
              </h1>
              <span className="text-gray-600 text-sm">
                {user?.bio || "Bio here..."}
              </span>
            </div>
          </div>
          <SuggestedUsers />
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
