const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const rimraf = require('rimraf');
const fs = require('fs');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
//const json = require("./test.json");

const Product = require('../models/products');



const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './excelUploads/')
  },
  filename: function(req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback) {
    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
      return callback(new Error('Wrong extension type'));
    }
    callback(null, true);
  }
}).single('file');


// 
// async function loadProducts() {
//   try {
//     const exproducts = await JSON.parse(fs.readFileSync( './jsonFolder/listproducts.json', 'utf-8'));
//     await Product.insertMany(exproducts);
//     console.log('products been uploaded secessfuly !');
//     await rimraf('./jsonFolder/*', function() {
//       console.log('json file been deleted');
//     });
//
//   } catch (e) {
//     console.log(e);
//
//   }
// };







async function deleteexcel() {
  rimraf('./excelUploads/*', function() {
    console.log('excel file been deleted');
  });
};

async function uloadExcel(req, res, next) {
  var exceltojson;
  upload(req, res, function(err) {
    if (err) {
      res.json({
        error_code: 1,
        err_desc: err
      });
      return;
    }
    /** Multer gives us file info in req.file object */
    if (!req.file) {
      res.json({
        error_code: 1,
        err_desc: "No file passed"
      });
      return;
    }
    /** Check the extension of the incoming file and
     *  use the appropriate module
     */
    if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
      exceltojson = xlsxtojson;
    } else {
      exceltojson = xlstojson;
    }
    console.log(req.file.path);
    try {
      exceltojson({
        input: req.file.path,
        output:  "./jsonFolder/listproducts.json",
        lowerCaseHeaders: true
      }, function(err, result) {
        if (err) {
          return res.json({
            error_code: 1,
            err_desc: err,
            data: null
          });
        }
        res.json({
          error_code: 0,
          err_desc: null,
          data: result
        });
        console.log("saving insertMany");
        Product.insertMany(result).then(result=>{
          console.log(result);
          res.status(201).json({
            message:'Created products',
            createdprudct: result
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error:err
          })
        });
        console.log("saved insertMany finishind successfully");
      });
      console.log("init delete excel");
      deleteexcel();

    } catch (e) {
      res.json({
        error_code: 1,
        err_desc: "Corupted excel file"
      });
    }
  })
};

//we have a problem with uploading json to atlas










router.post('/', (req, res, next) => {
  uloadExcel(req, res, next);

  res.json({
    message: "excel file been uploaded and saved to database"
  });
});

module.exports = router;
