import axios from 'axios'
import { API_URL } from '../../config/api.config.js'
import { createNewchat ,selectedChatIde ,activeChatMessages,addNewMessage ,setChats ,setMessages  } from '../Slicees/chatSlice.jsx'

const BASE_URL = API_URL 

export const Chatfetch = ()=> async (dispatch)=>{ // action hamesha dispatch hoti hae 
    const chat = await axios.get(`${BASE_URL}/api/chat`,{withCredentials:true})
    //  console.log(chat.data.chats) chat object with details
    dispatch(setChats({chats:chat.data.chats}))
}
export const Messagesfetch = (chatId)=> async (dispatch)=>{
    if(!chatId) return; // if no chat id is provided, do nothing
    // alert(chatId)
    const messages = await axios.get(`${BASE_URL}/api/chat/messages/${chatId}`,{withCredentials:true})
    // console.log(messages.data.Messages) messages object with details
    // console.log("Messages:", messages.data.messages)
    dispatch(setMessages ({Messages:messages.data.messages}))
    dispatch(selectedChatIde({
        selectedChatId:chatId
    }))

}

export const createNewchats = ({tittle}) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/chat`, { tittle:tittle }, { withCredentials: true });
        const newChat = response.data.chat;
        
        dispatch(createNewchat({ tittle: tittle }));
        await dispatch(Chatfetch()); // Fetch updated chat list after creating a new chat
        
        // Auto-select the newly created chat
        if (newChat && newChat._id) {
            dispatch(Messagesfetch(newChat._id));
        }
        
        return { success: true, chat: newChat };
    } catch (error) {
        console.error('Error creating new chat:', error);
        return { success: false, error: error.message };
    }
}
export const deleteChat = (chatId) => async (dispatch) => {
    try{
        const response = await axios.delete(`${BASE_URL}/api/chat/${chatId}`, { withCredentials: true });
        console.log(response.data);
        dispatch(Chatfetch()); // Fetch updated chat list after deleting a chat
        dispatch(setMessages({ Messages: [] })); // Clear messages if the deleted chat was selected
    }catch(error){  
        console.error('Error deleting chat:', error);
    }
}