const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const rimraf = require('rimraf');
// const imagemin = require('imagemin');
// const imageminJpegtran = require('imagemin-jpegtran');
// const imageminPngquant = require('imagemin-pngquant');
//const fs = require('fs');
//const sharp = require('sharp');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
      cb(null, './uploads/');
    },
    filename :function(req, file, cb){
      cb(null,  file.originalname);
    }
});
const upload = multer({storage: storage});
//uploads folder inst acessible so we need to turn it into a static folder in app.js
const Product = require('../models/products');





///////////////////////////////////////////// search pagenation/////////////////////////////////////////////
router.get('/search/:bookname/:page',(req, res, next)=>{


  const resPerPage =12;
  const page = req.params.page || 1;
console.log(page);
  var regex = new RegExp(req.params.bookname, 'i');
  Product.find({$or:[{bookname: regex},{authorname: regex},{genre:regex}]})
   .sort({'createdAt':-1})
   .skip((resPerPage * page) - resPerPage)
  .limit(resPerPage)
  .select('_id bookname aboutname authorname isbn genre quantity price rating productimgl productimgs sale')
  .populate('Product')
  .exec()
  .then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
        bookname:doc.bookname,
        sale:doc.sale,
        aboutbook: doc.aboutbook,
        authorname: doc.authorname,
        isbn: doc.isbn,
        genre: doc.genre,
        sale: doc.sale,
        available: doc.available,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productimgl: doc.productimgl,//delete this
        productimgs: doc.productimgs,//delete this
        productimg: doc.productimg,
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d lbook , 2000000IQ shit
          type:'GET',
          url:'http://localhost:3000/products/' +doc._id
        }
      }
    })
  };

    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});








////////////////////////////////////////////////////////////////////////////////////////
router.get('/search/:bookname',(req, res, next)=>{

  var regex = new RegExp(req.params.bookname, 'i');
  Product.find({$or:[{bookname: regex},{authorname: regex},{genre:regex}]})
   .sort({'createdAt':-1})
  .limit(10)
  .select('_id bookname aboutname authorname isbn genre quantity price rating productimgl productimgs sale')
  .populate('Product')
  .exec()
  .then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
        bookname:doc.bookname,
        sale:doc.sale,
        aboutbook: doc.aboutbook,
        authorname: doc.authorname,
        isbn: doc.isbn,
        genre: doc.genre,
        sale: doc.sale,
        available: doc.available,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productimgl: doc.productimgl,//delte this
        productimgs: doc.productimgs,//delete this
        productimg: doc.productimg,
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d lbook , 2000000IQ shit
          type:'GET',
          url:'http://localhost:3000/products/' +doc._id
        }
      }
    })
  };
    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});

///////////////GET 5 sales //////////////

router.get('/sales',(req, res, next)=>{
  Product.find({sale:true})
   .sort({ 'createdAt':-1})
  .limit(5)
  .select('_id bookname aboutname authorname isbn genre quantity price rating productimgl productimgs sale')
  .populate('Product')
  .exec()
  .then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
        bookname:doc.bookname,
        sale:doc.sale,
        aboutbook: doc.aboutbook,
        authorname: doc.authorname,
        isbn: doc.isbn,
        genre: doc.genre,
        sale: doc.sale,
        available: doc.available,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productimgl: doc.productimgl,//delete this
        productimgs: doc.productimgs,//delete this
        productimg: doc.productimg,
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d lbook , 2000000IQ shit
          type:'GET',
          url:'http://localhost:3000/products/' +doc._id
        }
      }
    })
  };
    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});

////////////////////////////genre//////////////////////
router.get('/genre/:genre',(req,res,next)=>{
  var regex = new RegExp(req.params.bookname, 'i');
  Product.find({genre:regex})
  .sort({'createdAt':-1})
  .limit(10)
  .select('_id bookname aboutname authorname isbn genre quantity price rating productimgl productimgs sale')
  .populate('Product')
  .exec()
  .then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
        bookname:doc.bookname,
        sale:doc.sale,
        aboutbook: doc.aboutbook,
        authorname: doc.authorname,
        isbn: doc.isbn,
        genre: doc.genre,
        sale: doc.sale,
        available: doc.available,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productimgl: doc.productimgl,//delete this
        productimgs: doc.productimgs,//delete this
        productimg: doc.productimg,
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d lbook , 2000000IQ shit
          type:'GET',
          url:'http://localhost:3000/products/' +doc._id
        }
      }
    })
  };
    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});

////////////////////// genre witch pages/////////////
router.get('/genre/:genre/:page',(req,res,next)=>{
  var regex = new RegExp(req.params.bookname, 'i');
  const resPerPage =10;
  const page = req.params.page || 1;
  Product.find({genre:regex})
  .sort({'createdAt':-1})
  .limit(resPerPage)
  .skip((resPerPage * page) - resPerPage)
  .select('_id bookname aboutname authorname isbn genre quantity price rating productimgl productimgs sale')
  .populate('Product')
  .exec()
  .then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
        bookname:doc.bookname,
        sale:doc.sale,
        aboutbook: doc.aboutbook,
        authorname: doc.authorname,
        isbn: doc.isbn,
        genre: doc.genre,
        sale: doc.sale,
        available: doc.available,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productimgl: doc.productimgl,//delete this
        productimgs: doc.productimgs,//delete this
        productimg: doc.productimg,
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d lbook , 2000000IQ shit
          type:'GET',
          url:'http://localhost:3000/products/' +doc._id
        }
      }
    })
  };
    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});





///////////////hero find latest 7//////////////////////
router.get('/hero',(req, res, next)=>{
  Product.find()
   .sort({ 'createdAt':-1})
  .limit(7)
  .select('_id bookname aboutbook authorname isbn genre quantity price rating productimgl productimgs sale')
  .populate('Product')
  .exec()
  .then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
        bookname:doc.bookname,
        sale:doc.sale,
        aboutbook: doc.aboutbook,
        authorname: doc.authorname,
        isbn: doc.isbn,
        genre: doc.genre,
        sale: doc.sale,
        available: doc.available,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productimgl: doc.productimgl,//delete this
        productimgs: doc.productimgs,//delte this
        productimg: doc.productimg,
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d lbook , 2000000IQ shit
          type:'GET',
          url:'http://localhost:3000/products/' +doc._id
        }
      }
    })
  };

    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});
/////////////////////brows 12 products a page////////////////////////////
router.get('/brows/:page',(req, res, next)=>{
  const resPerPage =12;
  const page = req.params.page || 1;
  Product.find()
  .sort({'createdAt':-1})
  .skip((resPerPage * page) - resPerPage)
  .limit(resPerPage)
  .select('_id bookname aboutbook authorname isbn genre quantity price rating productimgl productimgs sale')
  .populate('Product')
  .exec()
  .then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
        bookname:doc.bookname,
        sale:doc.sale,
        aboutbook: doc.aboutbook,
        authorname: doc.authorname,
        isbn: doc.isbn,
        genre: doc.genre,
        sale: doc.sale,
        available: doc.available,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productimgl: doc.productimgl,//delete this
        productimgs: doc.productimgs,//delte this
        productimg: doc.productimg,
        request:{
          
          type:'GET',
          url:'http://localhost:3000/products/' +doc._id
        }
      }
    })
  };

    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});
//*********************************************************\\
//uploading imgs in binary would be a bit dificult
// router.post('/',(req, res, next)=>{
// //calling and charging construct
//   const product = new Product({
//     _id: new mongoose.Types.ObjectId(),
//     name : req.body.name,
//     price: req.body.price
//   });
//   //saving the product
//   product
//   .save()
//   .then(result=>{
//     console.log(result);
//     res.status(201).json({
//       message:'Created product',
//       createdprudct: result
//     });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({
//       error:err
//     })
//   });
//
// });
//*****************************************************\\

//posting forms with multer makes it easier to upload imgs and files with other content
// multer like body parser but for forum bodies
// npm install --save multer
// async function CopyImage(path){
//   await fs.copyFile(path, `${path}`,(err)=>console.log(err));
//   await fs.copyFile(path, `${path}`,(err)=>console.log(err));
//   await fs.unlink(path,(err)=>console.log(err));
// };
// async function MinifyImages(){
// 	 const largeImages = await imagemin(['./uploads/*.{jpg,png}'], './images/imgL', {
// 		plugins: [
// 			imageminJpegtran(),
// 			imageminPngquant({
// 				quality: [0.6, 0.8]
// 			})
// 		]
// 	});
//   const smallImages =await imagemin(['./uploads/*.{jpg,png}'], './images/imgS', {
//    plugins: [
//      imageminJpegtran(),
//      imageminPngquant({
//        quality: [0.1, 0.2]
//      })
//    ]
//  });
//  largeImages.map((item)=>console.log(item.path));
//  await rimraf('./uploads/*', function () { console.log('done'); });
// 	//=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
//   return [largeImages[0].path,smallImages[0].path]
//};
// function MinifyImages(){
//   fs.readdir("./uploads", function(err, items) {
//     console.log(items);

//     for (var i=0; i<items.length; i++) {
//       sharp('./uploads/'+ items[i])// it needs image path folder doesntwork
//       .jpeg({
//         quality: 20,
//       })
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

//     //larg imgS

//     for (var i=0; i<items.length; i++) {
//       sharp('./uploads/'+ items[i])// it needs image path folder doesntwork
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

//     // deleting all original largeImages
//     rimraf('./uploads/*', function () { console.log('done'); });
// });
// }
/////////////////////////////////////////////
router.post('/',upload.single('productimg') ,(req, res, next)=>{
  const product = new Product({

    _id: new mongoose.Types.ObjectId(),
    bookname:req.body.bookname,
    aboutbook: req.body.aboutbook,
    authorname: req.body.authorname,
    isbn: req.body.isbn,
    genre: req.body.genre,
    quantity: req.body.quantity,
    price:req.body.price,
    rating: req.body.rating,
    productimg: `/uploads/${req.file.filename}`
  });
  //saving the product
  product
  .save()
  .then(result=>{
    console.log(result);
    res.status(201).json({
      message:'Created product',
      createdprudct: result
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error:err
    })
  });

});





router.get('/view/:productId', (req, res, next)=>{
  const id = req.params.productId;
  Product.findById(id)
  .exec()
  .then(doc =>{
    console.log("from database",doc);
    if(doc){
      res.status(200).json(doc);
    }else{
      res.status(404).json({
        message: 'No valid entry found for provided ID'
      });
    }

  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({error:err});

  });
});
// anyways here we handle post get patch delete update methodes
router.delete("/:productId", (req, res, next)=>{

  const id= req.params.productId;
  Product.remove({_id: is})
  .exec()
  .then(result =>{
    res.status(200).json({
      message:'product deleted',
      request:{
        type:'POST',
        url:'http://localhost:3000/products/',
        body:{
          bookname: {type: String, required: true},
          aboutbook: {type: String, required: true},
          authorname: {type: String, required: true},
          isbn: {type: String, required: true},
          genre: {type: String, required: true},
          quantity:Number,
          price: Number,
          rating:Number,
          productimg:{type:String, required:true},
        }
      }
    });

  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  });
});
//updating data with a array format [
// {
// 	"propName":"name",
// 	"value":"alchimist"
// }
// ]
router.patch("/:productId",(req, res, next)=>{
  const id= req.params.productId;
  const updateOps = {};
  for(const ops of req.body ){
    updateOps[ops.propName]=ops.value;
  }
  Product.update({_id:id},{$set:updateOps})
  .exec()
  .then(result=>{
    res.status(200).json({
      message:'Product updated',
      request:{
        type:'GET',
        url:'http://localhost:3000/products/'+ id
      }
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});


module.exports = router;
