const chatModel = require('../Models/chat.models.js')
const messageModel  = require('../Models/message.model.js')
const createChat = async (req,res)=>{
    const {tittle} = req.body;
    // const userId = req.user; // Diya fir me mongoodb me objectid save hogi kyu hame model me types defind kiya hae and ek baat
    const userId = req.user._id; // User ID from the authenticated user

    const chat = await chatModel.create({
        user: userId,
        tittle: tittle
    });
    res.status(201).json({
        message: "Chat created successfully",
        chat: {
            id: chat._id,
            user: chat.user,
            tittle: chat.tittle,
            lastActivity: chat.lastActivity
        }
    }); 

}



async function getChats(req, res) {
    const user = req.user;

    const chats = await chatModel.find({ user: user._id });

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats: chats.map(chat => ({
            _id: chat._id,
            tittle: chat.tittle,
            lastActivity: chat.lastActivity,
            user: chat.user
        }))
    });
}

async function getMessages(req, res) {

    const chatId = req.params.id;

    const messages = await messageModel.find({ chat: chatId }).sort({ createdAt: 1 });

    res.status(200).json({
        message: "Messages retrieved successfully",
        messages: messages
    })

}


async function deleteChat(req, res) {
    const chatId = req.params.id;
    const userId = req.user._id;

    // Verify that the chat belongs to the user
    const chat = await chatModel.findOne({ _id: chatId, user: userId });
    if (!chat) {
        return res.status(404).json({ message: "Chat not found or you do not have permission to delete it." });
    }

    // Delete the chat and its associated messages
    await messageModel.deleteMany({ chat: chatId });
    await chatModel.deleteOne({ _id: chatId });

    res.status(200).json({ message: "Chat and its messages deleted successfully." });

}

module.exports={
    createChat,getChats,getMessages ,deleteChat
}