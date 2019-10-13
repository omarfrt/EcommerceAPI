# docs and comments for [orders.js](orders.js)

here you'll find examples of requests and responses you'll get out of [orders.js](orders.js) route

#Oreders Model 

the database model can be found in [order.js](https://github.com/omarfrt/store-api/blob/master/api/models/order.js)
```
  _id: mongoose.Schema.Types.ObjectId,
  products: [{  _id:{type: String, required: true},
              bookName:{type: String, required: true},
              authorName:{type: String, required: true},
              isbn:{type: String, required: true},
              // orderQte:{type:Number,required:false},
              price: {type:Number , required:true}}],
        user:     { firstname:{type: String, required: true},
              lastname:{type: String, required: true},
              email:{type: String, required: true},
              phone:{type: String, required: true},
              address:{type: String, required: true},
              Cin:{type: String, required: true}},
  totalPrice: {type:Number, required:true},
  confirmed:{type:Boolean , required : false}
});
orderSchema.plugin(timestamps);
```
note that products is an array of products!

## GET 
### Request 

```
get http://localhost:3000/orders/:page
```

### Response
sends latest 20 orders in each page 
```
  _id: doc._id,
          product: doc.products,
          user: doc.user,
          totalPrice:doc.totalPrice,
          confirmed:doc.confirmed,
          updatedAt:doc.updatedAt,
          createdAt:doc.createdAt,
```
note that products is an array of products!

with a status of 200
 
 ### Error Response
 
returns a jason 

```
error:err
```

  with a status off 500

## POST

### Request

```
Post http://localhost:3000/orders/
```

  with body 

```
products: [{  _id:{type: String, required: true},
              bookName:{type: String, required: true},
              authorName:{type: String, required: true},
              isbn:{type: String, required: true},
              // orderQte:{type:Number,required:false},
              price: {type:Number , required:true}}],
        user:     { firstname:{type: String, required: true},
              lastname:{type: String, required: true},
              email:{type: String, required: true},
              phone:{type: String, required: true},
              address:{type: String, required: true},
              Cin:{type: String, required: true}}
 //note that products is an array of products !!
 ```
 ### Response

  Responds with json
  
  ```
      message:'Created Order',
      createdprudct: result 
  ```
  with status 201
  
### Error Response

  Responds with json
  
  ```
  error:err
  ```
  with status 500

## GET ONE ORDER BY ID

  
```
Get http://localhost:3000/orders/:orderId
```

### Response

```
  _id: doc._id,
          product: doc.products,
          user: doc.user,
          totalPrice:doc.totalPrice,
          confirmed:doc.confirmed,
          updatedAt:doc.updatedAt,
          createdAt:doc.createdAt,
```
note that products is an array of products!

with a status of 200
 
 ### Error Response
 
returns a jason 

```
error:err
```

  with a status off 500
  
  
## DELETE order

 
```
DELETE http://localhost:3000/orders/:orderId
```
### response
```
message:'order been deleted',
        request:{
          type:'POSt',
          url:'http://localhost:3000/orders/',
          body:{productId:'ID', quantity:'Number'}
```
## CONFIRM ORDER

### request

```
PATCH http://localhost:2000/orders/:orderId
```
### response
```
this basically sets:
confirm: true,
to the order
and sends email confirming th order(the email needs to be set corectly ) 
```
