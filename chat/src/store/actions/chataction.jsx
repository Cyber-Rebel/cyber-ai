import axios from '../../api/axios.jsx'

import { createNewchat ,selectedChatIde ,activeChatMessages,addNewMessage ,setChats ,setMessages  } from '../Slicees/chatSlice.jsx'

export const Chatfetch = ()=> async (dispatch)=>{ // action hamesha dispatch hoti hae 
    const chat = await axios.get(`/api/chat`,{withCredentials:true})
    //  console.log(chat.data.chats) chat object with details
    dispatch(setChats({chats:chat.data.chats}))
}
export const Messagesfetch = (chatId)=> async (dispatch)=>{
    if(!chatId) return; // if no chat id is provided, do nothing
    // alert(chatId)
    const messages = await axios.get(`/api/chat/messages/${chatId}`,{withCredentials:true})
    // console.log(messages.data.Messages) messages object with details
    // console.log("Messages:", messages.data.messages)
    dispatch(setMessages ({Messages:messages.data.messages}))
    dispatch(selectedChatIde({
        selectedChatId:chatId
    }))
}

export const createNewchats = ({tittle}) => async (dispatch) => {
    console.log("chatactions show" , tittle)
    try {
        const response = await axios.post(`/api/chat`, { tittle:tittle }, { withCredentials: true });
        console.log(response.data);
        dispatch(createNewchat({ tittle: tittle }));
        dispatch(Chatfetch()); // Fetch updated chat list after creating a new chat
    } catch (error) {
        console.error('Error creating new chat:', error);
    }
}
export const deleteChat = (chatId) => async (dispatch) => {
    try{
        const response = await axios.delete(`/api/chat/${chatId}`, { withCredentials: true });
        console.log(response.data);
        dispatch(Chatfetch()); // Fetch updated chat list after deleting a chat
        dispatch(setMessages({ Messages: [] })); // Clear messages if the deleted chat was selected
    }catch(error){  
        console.error('Error deleting chat:', error);
    }
}