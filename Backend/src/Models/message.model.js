// chat Histroy 
const mongoose = require('mongoose');

const messageSchema  = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    // required: true,
  },
  content: {
    type: String,
    // required: true,
  },
    chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chat',
    // required: true,
  },
  role:{ // ye jo role property hae eska type kya hoga string hoga but strings me useki bhi do value hogi user or model  use ho sakt hae 
    type: String,
    enum: ['user', 'model'], // enum boundary value hote hae jo ki string me hi hote hae
        
    //enum ek role set karnata hae role ki jo value hae wo user or model hi ho sakti hae 
    default: 'user',    // default me value user set hagi 
  }

},{
  timestamps: true,
});                             
    
const Message = new mongoose.model('Message', messageSchema);
module.exports = Message;                                                                                                                   