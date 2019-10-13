// const mongoose = require('mongoose');
// const timestamps = require('mongoose-timestamp');
// const orderSchema = mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   products: [{  _id:{type: String, required: true},
//     bookname: {type: String, required: true},
//     sale:{type:Boolean , required : false},
//     aboutbook: {type: String, required: true},
//     authorname: {type: String, required: true},
//     isbn: {type: String, required: true},
//     genre: {type: String, required: true},
//    // quantity:Number,
//     price: {type: Number, required: true},
//     rating:{type: Number, required: false},
//     productimgl:{type: String, required: false},
//     productimgs:{type: String, required: false}
//   }],
//   user:     { firstname:{type: String, required: true},
//               lastname:{type: String, required: true},
//               email:{type: String, required: true},
//               phone:{type: String, required: true},
//               address:{type: String, required: true},
//               cin:{type: String, required: true}},
//   totalPrice: {type:Number, required:true},
//   confirmed:{type:Boolean , required : false}
// });
// orderSchema.plugin(timestamps);


// module.exports = mongoose.model('Order', orderSchema);
