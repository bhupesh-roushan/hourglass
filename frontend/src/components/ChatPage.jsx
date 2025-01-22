// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { setSelectedUser } from "@/redux/authSlice";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { MessageCircleCode } from "lucide-react";
// import Messages from "./Messages";
// import axios from "axios";
// import { setMessages } from "@/redux/chatSlice";

// const ChatPage = () => {
//   const [textMessage, setTextMessage] = useState("");
//   const { user, suggestedUsers, selectedUser } = useSelector(
//     (store) => store.auth
//   );
//   const { onlineUsers, messages } = useSelector((store) => store.chat);
//   const dispatch = useDispatch();

//   const sendMessageHandler = async (receiverId) => {
//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/message/send/${receiverId}`,
//         { textMessage },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         dispatch(setMessages([...messages, res.data.newMessage]));
//         setTextMessage("");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       dispatch(setSelectedUser(null));
//     };
//   }, []);

//   return (
//     <div className="flex ml-[0%] md:ml-[16%] h-screen bg-black text-white">
//       <section className="  shadow-sm shadow-gray-500 h-s[100%]">
//         <h1 className="font-bold mb-4 mt-20 md:mt-5 px-3 text-xl text-center">
//           Messages
//         </h1>
//         <hr className="mb-4 border-gray-500 " />
//         <div className="overflow-y-auto h-[80vh] ml-5">
//           {suggestedUsers.map((suggestedUser) => {
//             const isOnline = onlineUsers.includes(suggestedUser?._id);
//             return (
//               <div
//                 onClick={() => dispatch(setSelectedUser(suggestedUser))}
//                 className="flex gap-3 items-center p-3 hover:shadow-md hover:shadow-gray-500 hover:text-lg transition-all duration-300 cursor-pointer hover:bg-black "
//                 key={suggestedUser?._id}
//               >
//                 <Avatar className="w-14 h-14">
//                   <AvatarImage src={suggestedUser?.profilePicture} />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//                 <div className="flex flex-col">
//                   <span className="font-medium">{suggestedUser?.username}</span>
//                   <span
//                     className={`text-xs font-bold ${
//                       isOnline ? "text-green-600" : "text-red-600"
//                     } `}
//                   >
//                     {isOnline ? "online" : "offline"}
//                   </span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>
//       {selectedUser ? (
//         <section className="flex-1 shadow-sm shadow-gray-500  flex flex-col h-full">
//           <div className="flex gap-3 items-center px-3 py-3 border-b border-gray-500 sticky top-0 bg-black z-10">
//             <Avatar>
//               <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//             <div className="flex flex-col">
//               <span>{selectedUser?.username}</span>
//             </div>
//           </div>
//           <Messages selectedUser={selectedUser} />
//           <div className="flex items-center p-4 border-t border-t-gray-500">
//             <Input
//               value={textMessage}
//               onChange={(e) => setTextMessage(e.target.value)}
//               type="text"
//               className="flex-1 mr-2 focus-visible:ring-transparent outline-none bg-black"
//               placeholder="Type a message..."
//             />
//             <Button
//               className="bg-black hover:shadow-sm hover:bg-black hover:shadow-blue-500 shadow-md shadow-gray-500"
//               onClick={() => sendMessageHandler(selectedUser?._id)}
//             >
//               Send
//             </Button>
//           </div>
//         </section>
//       ) : (
//         <div className="flex flex-col items-center justify-center mx-auto">
//           <MessageCircleCode className="w-32 h-32 my-4" />
//           <h1 className="font-medium">Your messages</h1>
//           <span>Send a message to start a chat.</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;




import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setSelectedUser } from "@/redux/authSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessageCircleCode } from "lucide-react";
import Messages from "./Messages";
import axios from "axios";
import { setMessages } from "@/redux/chatSlice";
import { FaGripLines } from "react-icons/fa";

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // To handle the state of the menu
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${receiverId}`,
        { textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);

  return (
    <div className="flex ml-[0%] md:ml-[16%] h-screen bg-black text-white p-5 md:p-0 ">
      <section className="shadow-sm :shadow-gray-500 h-s[100%]">
        <h1 className="font-bold  mb-4 mt-20 md:mt-5 px-2 text-sm md:text-xl text-center border-r-2">
          Messages
        </h1>
        <hr className="mb-4 border-gray-500" />

        {/* Hamburger Menu for small screens */}
        <div className="md:hidden flex justify-between items-center mt-10 px-3">
          <Button
            className="p-2"
            variant="ghost"
            onClick={() => setMenuOpen((prev) => !prev)} // Toggle menu
          >
            <FaGripLines/>
        
         
          </Button>

          {/* Menu Dropdown for suggested users */}
          {menuOpen && (
            <div className="absolute top-48 left-0 w-40 bg-black text-white p-2">
              {suggestedUsers.map((suggestedUser) => {
                const isOnline = onlineUsers.includes(suggestedUser?._id);
                return (
                  <div
                    onClick={() => {
                      dispatch(setSelectedUser(suggestedUser));
                      setMenuOpen(false); // Close the menu after selecting
                    }}
                    key={suggestedUser?._id}
                    className="flex gap-3 items-center p-3 hover:bg-gray-700 cursor-pointer"
                  >
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={suggestedUser?.profilePicture} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{suggestedUser?.username}</span>
                      <span
                        className={`text-xs font-bold ${
                          isOnline ? "text-green-600" : "text-red-600"
                        } `}
                      >
                        {isOnline ? "online" : "offline"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* List of suggested users for larger screens */}
        <div className="overflow-y-auto h-[80vh] ml-5 hidden md:block">
          {suggestedUsers.map((suggestedUser) => {
            const isOnline = onlineUsers.includes(suggestedUser?._id);
            return (
              <div
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                className="flex gap-3 items-center p-3 hover:shadow-md hover:shadow-gray-500 hover:text-lg transition-all duration-300 cursor-pointer hover:bg-black"
                key={suggestedUser?._id}
              >
                <Avatar className="w-14 h-14">
                  <AvatarImage src={suggestedUser?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{suggestedUser?.username}</span>
                  <span
                    className={`text-xs font-bold ${
                      isOnline ? "text-green-600" : "text-red-600"
                    } `}
                  >
                    {isOnline ? "online" : "offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {selectedUser ? (
        <section className="flex-1 shadow-sm shadow-gray-500 flex flex-col h-full ">
          <div className="flex gap-3 items-center  px-3 py-3 border-b border-gray-500 sticky top-0 bg-black z-10">
            <Avatar>
              <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span>{selectedUser?.username}</span>
            </div>
          </div>
          <Messages selectedUser={selectedUser} />
          <div className="flex flex-col md:flex-row gap-5 p-5 items-center md:p-4 border-t mb-20 border-t-gray-500">
            <Input
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              type="text"
              className="flex-1 mr-2 focus-visible:ring-transparent outline-none bg-black"
              placeholder="Type a message..."
            />
            <Button
              className="bg-black hover:shadow-sm hover:bg-black hover:shadow-blue-500 shadow-md shadow-gray-500"
              onClick={() => sendMessageHandler(selectedUser?._id)}
            >
              Send
            </Button>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto">
          <MessageCircleCode className="w-32 h-32 my-4" />
          <h1 className="font-medium">Your messages</h1>
          <span>Send a message to start a chat.</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
