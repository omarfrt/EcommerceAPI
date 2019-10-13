# docs and comments for [products.js](product.js)

here you'll find examples of requests and responses you'll get out of [products.js](product.js) route


# Products Model
the database model can be found in [products.js](https://github.com/omarfrt/store-api/blob/master/api/models/products.js)

```
_id: mongoose.Schema.Types.ObjectId,
bookname: {type: String, required: false},
  aboutBook: {type: String, required: false},
  authorName: {type: String, required: false},
  isbn: {type: String, required: false},
  genre: {type: String, required: false},
  quantity:Number,
  price: Number,
  rating:Number,
  productImgL:{type: String, required: false},
  productImgS:{type: String, required: false}
```


## GET 
### Request 

```
get http://localhost:3000/products/
```
### Response

```
        _id: doc._id,
      bookname:docbookname,
        about: doc.aboutBook,
        author: doc.authorName,
        isbn: doc.isbn,
        genre: doc.genre,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productImgL: doc.productImgL,
        productImgS: doc.productImgS,
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d lbook , 2000000IQ shit
          type:'GET',
          url:'http://localhost:3000/products/' +doc._id
```
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
Post http://localhost:3000/products/
```

  with body 

```
  bookname:
    about:
    author:
    isbn: 
    genre: 
    quantity: 
    price:
    rating: 
    productImage: // img here
```
### Response

  Responds with json
  
  ```
      message:'Created product',
      createdprudct: result 
  ```
  with status 201
  
### Error Response

  Responds with json
  
  ```
  error:err
  ```
  with status 500
  
  
# GET BYID

getting a spesific product

### Request

```
get http://localhost:3000/products/:productId
```
### Response


```
    _id:
  bookname:
    about:
    author:
    isbn: 
    genre: 
    quantity: 
    price:
    rating: 
    productImgL: 
    productImgS: 
```
  status 200
  
### Error Response

  status 404
  
  ```
  message: 'No valid entry found for provided ID'
  ```
  status 500
  
  ```
  error:err
  ```
  
  ## DELETE
  
  ### Request
  
  ```
  delete http://localhost:3000/products/:productId
  ```

  ### Response
  
  ```
  message:'product deleted',
      request:{
        type:'POST',
        url:'http://localhost:3000/products/',
        body:{
        bookname: {type: String, required: true},
          aboutBook: {type: String, required: true},
          authorName: {type: String, required: true},
          isbn: {type: String, required: true},
          genre: {type: String, required: true},
          quantity:Number,
          price: Number,
          rating:Number,
          productImgL:{type: String, required: true},
          productImgS:{type: String, required: true}
   ```


  ### Error Response
  
  Status 500
  ```
  error : err
  ```
  
  ## PATCH
  
  ### Request
  
  ```
  patch http://localhost:3000/products/:productId
  ```
    with body 
    
    ```
    //you can patch what you want not full body , exmple justbookname.
      bookname:
        about:
        author:
        isbn: 
        genre: 
        quantity: 
        price:
        rating: 
        productImage:
    ```
    
  ### Respone
    
    Status 200
    
    ```
        message:'Product updated',
        request:{
        type:'GET',
        url:'http://localhost:3000/products/'+ id
    ```
    
  ### Error Response
   
    Status 500
    
    ```
    error : err
    ```
    





