const express = require ('express');
const router = express.Router();
const multer = require('multer');
const rimraf = require('rimraf');
const sharp = require('sharp');
const fs = require('fs');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
      cb(null, './uploads/');
    },
    filename :function(req, file, cb){
      cb(null,file.originalname);
    }
});
const upload = multer({storage: storage});

//
// async function MinifyImages(){
// 	 const largeImages = await  imagemin(['./imguploads/*.{jpg,png}'], './images/imgL', {
// 		plugins: [
// 			imageminJpegtran(),
// 			imageminPngquant({
// 				quality: [0.6, 0.8]
// 			})
// 		]
// 	});
//   const smallImages =await imagemin(['./imguploads/*.{jpg,png}'], './images/imgS', {
//    plugins: [
//      imageminJpegtran(),
//      imageminPngquant({
//        quality: [0.1, 0.2]
//      })
//    ]
//  });
//  largeImages.map((item)=>console.log(item.path));
//  await rimraf('./imguploads/*', function () { console.log('done'); });
//
//
// };


// async function MinifyImages(){
//   const largeImages = await sharp('./imguploads/')// it needs image path folder doesntwork
//     .resize(300, 200)
//     .toFile('./images/imgS/l.jpg', function(err) { // same here it needs the fullpath with new image name to be saved
//       if(!err){
//         console.log("everything is working nigga");
//       } else{
//         console.log(err);
//       }
//       // output.jpg is a 300 pixels wide and 200 pixels high image
//       // containing a scaled and cropped version of input.jpg
//     });
// };


//   fs.readdir("./imguploads", function(err, items) {
//     console.log(items);
//
//     for (var i=0; i<items.length; i++) {
//       sharp('./imguploads/'+ items[i])// it needs image path folder doesntwork
//         .resize(300, 200)
//         .toFile('./images/imgS/'+ items[i], function(err) { // same here it needs the fullpath with new image name to be saved
//           if(!err){
//             console.log("everything is working for small imgs");
//           } else{
//             console.log(err);
//           }
//           // output.jpg is a 300 pixels wide and 200 pixels high image
//           // containing a scaled and cropped version of input.jpg
//         });
//         console.log(items[i]);
//     }
//
//     //larg imgS
//
//     for (var i=0; i<items.length; i++) {
//       sharp('./imguploads/'+ items[i])// it needs image path folder doesntwork
//         .resize(300, 200)
//         .toFile('./images/imgL/'+ items[i], function(err) { // same here it needs the fullpath with new image name to be saved
//           if(!err){
//             console.log("everything is working for Larg imgs");
//           } else{
//             console.log(err);
//           }
//           // output.jpg is a 300 pixels wide and 200 pixels high image
//           // containing a scaled and cropped version of input.jpg
//         });
//         console.log(items[i]);
//     }
//
//     // deleting all original largeImages
//     rimraf('./imguploads/*', function () { console.log('original images been deleted'); });
// });





router.post("/",upload.array("imgupload"),(req,res,next)=>{
  res.json({
    message:"we good"
  });



});



module.exports = router;
