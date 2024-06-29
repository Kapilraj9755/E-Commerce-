const express = require('express');
const Product = require('../models/product');
const Review = require('../models/review');
const router = express.Router();
const { validateProduct, isLoggedIn, isSeller, isProductAuthor } = require('../middleware');
const {ShowAllProduct , ProductForm , CreateProduct, ShowProduct, ProductEditForm, UpdateForm, DeleteProduct} = require('../controllers/Product')

router.get('/products', ShowAllProduct );   //Show All Product

router.get('/products/new', isLoggedIn, isSeller, ProductForm)   // Show A new Form

router.post('/products',isLoggedIn, isSeller, validateProduct, CreateProduct)  //Create A Product

router.get('/products/:id', ShowProduct)  // Show a single product

router.get('/products/:id/edit',isLoggedIn, isSeller, isProductAuthor,ProductEditForm)   //show form for Edit Product

router.patch('/products/:id',isLoggedIn, isSeller, validateProduct, isProductAuthor, UpdateForm)  // update a product

router.delete('/products/:id', isLoggedIn, isSeller, isProductAuthor,DeleteProduct)



module.exports = router;