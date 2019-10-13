const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRoutes = require('./api/routes/user');
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const productexRoutes = require('./api/routes/excelProduct');
const uploadimgsRoutes = require('./api/routes/imagesUpload');


// mongoose.connect('mongodb+srv://jlo:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop-ijnnd.mongodb.net/test?retryWrites=true&w=majority', {
//   useNewUrlParser: true
// });


app.use(morgan('dev'));
app.use('/images', express.static('images'));// delete this later 
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
//cors handelling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origins,X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
// routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', usersRoutes);
app.use('/excelProduct', productexRoutes);
app.use('/imagesUpload', uploadimgsRoutes);


//handling errors
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error
    }
  });
});

module.exports = app;
