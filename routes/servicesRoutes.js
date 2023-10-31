const express = require('express');
const routes = express.Router()
const {verifyToken} = require("../utils/jwt");
const { UploadProducts, DisplayUploadedProducts, DeleteProduct, EditProduct, UpdateProducts, uploadProductImages, ChangeProductStatus } = require('../controllers/uploadController');
const { Login, CreateAccount, Signout } = require('../controllers/loginController');
const { FetchAllCategories, FetchAllProducts, FetchAllProductByCategory, FetchAllLuxuryHair, FetchAllAccessories, FetchAllBraids, FetchAllHumanHairBlend, FetchAllHumanHair, FetchAllProductById, AddCart, FetchCartInformation, RemoveItemById, DeleteCartItemsByUniqueCode, ConfirmOrders, FetchCustomerOrder, ConfirmDelivery, FetchMyOrder } = require('../controllers/productController');
const { CreateStatistics, WebsiteReport } = require('../controllers/visitorsController');

/**
 *  LOGIN
 */
routes.post("/login", Login)
routes.post("/create-account", CreateAccount)
routes.post("/logout", Signout )

/**
 *  CREATE STATISTICS
 */
routes.post("/create-statistics", CreateStatistics)
routes.get("/fetch-statistics", WebsiteReport)

/**
 * UPLOADS 
 */
routes.post("/upload-product", verifyToken, UploadProducts )
routes.get("/view-products", verifyToken, DisplayUploadedProducts )
routes.post("/delete-product", verifyToken, DeleteProduct )
routes.post("/change-product-status", verifyToken, ChangeProductStatus )
routes.post("/edit-product", verifyToken, EditProduct )
routes.post("/update-product", verifyToken, UpdateProducts )
routes.post("/upload-product-images", verifyToken, uploadProductImages )

/**
 * PRODUCTS
 */
routes.get("/all-categories", verifyToken, FetchAllCategories)
routes.get("/all-products", FetchAllProducts)
routes.post("/all-productsby-category", FetchAllProductByCategory)
routes.get("/all-luxuryhair", FetchAllLuxuryHair)
routes.get("/all-humanhair", FetchAllHumanHair)
routes.get("/all-humanhair-blend", FetchAllHumanHairBlend)
routes.get("/all-braids", FetchAllBraids)
routes.get("/all-accessories", FetchAllAccessories)
routes.post("/fetch-productbyid", FetchAllProductById)
routes.post("/fetch-cart-information", FetchCartInformation)
routes.post("/remove-item", RemoveItemById)
routes.post("/deleteall-cartitems", verifyToken, DeleteCartItemsByUniqueCode)
routes.post("/confirm-order", verifyToken, ConfirmOrders)
routes.get("/fetch-customer-order", verifyToken, FetchCustomerOrder)
routes.post("/confirm-delivery", verifyToken, ConfirmDelivery)
routes.post("/fetch-my-order", verifyToken, FetchMyOrder)

/**
 *  CART
 */
routes.post("/add-cart", AddCart)

module.exports = routes