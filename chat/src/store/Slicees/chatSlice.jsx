import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    chats: [],
   selectedChatId:null , // current open chat // defalut null hogi 
    isSending: false,
    Messages:[],
    // setParticulateChatMessages:[],
  selectActiveChatMessages:[] 
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // part   1
        setChats: (state, action) => {
            state.chats = action.payload.chats;
        },
        // part 2 
        setMessages : (state, action) => {
            state.Messages = action.payload.Messages;
        },
// part 3 
         createNewchat: (state, action) => {
            const newChat = {
        tittle: action.payload?.tittle || "New Chat",
        };
        
        
        
        state.chats.push(newChat); // reducer -> slice ->store when change the data 
        
    },
    

    

         selectedChatIde: (state, action) => {   
            state.selectedChatId = action.payload.selectedChatId;
        },

        // activechat messages  
        activeChatMessages: (state) => {
      if (!state.selectedChatId) [];
       state.Messages.filter(msg => msg.chat === state.selectedChatId);
    },

       addNewMessage: (state, action) => {
        if (!state.selectedChatId) return;  // No chat selected, do nothing
        
            console.log(action.payload.role)
        state.Messages.push(action.payload);
    
        },
        
        
                // setIsSending: (state, action) => {
                //     state.isSending = action.payload;
                // },
        

}})
export const { createNewchat ,selectedChatIde ,activeChatMessages,addNewMessage,setChats ,setMessages  } = chatSlice.actions
export default chatSlice.reducer





// STATE MATLAB INITAAL DATA ]
// ACTION  = MATLAB CHANGE ABLE DATA
// REDUCER =  ACTION KO  STATE ME LAGANE KA TARIKA
// DISPATCH =  ACTION KO CALL KARNE KA TARIKA   

// Termitucal hota hae ki ai model kitna creative anserwer de but kabhi kabhi createive hone ke chakkar me ai model galat anserwer de deta hae  isko hum log temperature se control karte hae 0.1 se 2.0 tak hota hae 1.0 normal hota hae jitna kam hoga utna hi ai model safe anserwer dega


// let m =[]
// m.push(12)
// console.log(m)