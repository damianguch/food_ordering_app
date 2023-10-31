const axios = require('axios');
const qs = require("qs");
const { createAppLog } = require('../utils/createLogs');
const { fetchAllCategories, fetchAllProducts, fetchAllProductByCategory, fetchAllLuxuryhair, fetchAllHumanhair, fetchAllHumanhairBlend, fetchAllBraids, fetchAllAccessories, fetchAllProductById, addCart, fetchCartInformation, removeItemById, deleteCartItemsByUniqueCode, fetchCustomerOrder, confirmDelivery, fetchMyOrder } = require('../models/productModel');
const { orders } = require('../models/orderModel');

// fetch all categories
const FetchAllCategories = async (req, res) => {
    try {
       
        let categories = await fetchAllCategories();

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
            category: categories,
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }

};

// fetch all products
const FetchAllProducts = async (req, res) => {
    try {
       
        let products = await fetchAllProducts();

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
            products: products,
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }

};

// fetch all products by category
const FetchAllProductByCategory = async (req, res) => {
    try {
       
        let data = {
            category: req.body.categoryid
        }

        let products = await fetchAllProductByCategory(data.category);

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
            products: products,
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }
};

// fetch all luxury hair
const FetchAllLuxuryHair = async (req, res) => {
    try {
       
        let products = await fetchAllLuxuryhair();

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
            products: products,
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }

};

// fetch all human hair
const FetchAllHumanHair = async (req, res) => {
    try {
       
        let products = await fetchAllHumanhair();

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
            products: products,
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }

};

// fetch all human hair blend
const FetchAllHumanHairBlend = async (req, res) => {
    try {
       
        let products = await fetchAllHumanhairBlend();

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
            products: products,
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }

};

// fetch all braids
const FetchAllBraids = async (req, res) => {
    try {
       
        let products = await fetchAllBraids();

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
            products: products,
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }

};

// fetch all braids
const FetchAllAccessories = async (req, res) => {
    try {
       
        let products = await fetchAllAccessories();

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
            products: products,
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }

};

// fetch all products by id
const FetchAllProductById = async (req, res) => {
    try {
       
        let data = {
            product_id: req.body.product_id
        }

        let products = await fetchAllProductById(data.product_id);

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
            products: products,
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }
};

// add to cart
const AddCart = async (req, res) => {
    try {
       
        let data = {
            cart: req.body.cart
        }
        let arrData = []
        arrData = data.cart;
        
        for (let index = 0; index < arrData.length; index++) {
            const el = arrData[index];
            await addCart(el[0].user_id, el[1].product_id, el[3].product_code, el[2].product_name, el[4].price, el[5].image);
        }
        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }
};

// fetch cart detail
const FetchCartInformation = async (req, res) => {
    try {
       
        let data = {
            user_id: req.body.user_id
        }

        let carts = await fetchCartInformation(data.user_id);

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
            carts: carts,
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }
};

// remove item from cart
const RemoveItemById = async (req, res) => {
    try {
       
        let data = {
            cartid: req.body.cartid
        }

        await removeItemById(data.cartid);

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Item has been remove successfully from the cart",
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }
};

// remove user items from cart after confirming order
const DeleteCartItemsByUniqueCode = async (req, res) => {
    try {
       
        let data = {
            unique_code: req.body.unique_code
        }

        await deleteCartItemsByUniqueCode(data.unique_code);

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }
};

// add to order
const ConfirmOrders = async (req, res) => {
    try {
       
        let data = {
            userid: req.body.user_id,
            orders: req.body.cart_items
        }

        let arrData = []
        arrData = data.orders;

        for (let index = 0; index < arrData.length; index++) {
            const el = arrData[index];
            await orders(data.userid, el.product_id, el.product_code, el.product_name, el.quantity, el.price, el.image);
        }
        return res.status(200).json({
            status: "00",
            success: true,
            message: "Your order has been confirm successfully.    Thank you for shopping with us.",
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }
};

// add to order
const FetchCustomerOrder = async (req, res) => {
    try {
       
        let orders = await fetchCustomerOrder();

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
            order: orders
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }
};

// confirm customer delivery
const ConfirmDelivery = async (req, res) => {
    try {
       
        let data = {
            orderid: req.body.orderid
        }

        await confirmDelivery(data.orderid);

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Delivery successfully confirmed",
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }
};

// fetch customer order
const FetchMyOrder = async (req, res) => {
    try {
        
        let data = {
            userid: req.body.userid,
        }

        let orders = await fetchMyOrder(data.userid);

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
            order: orders
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Not successful!",
        });
    }
};

module.exports = {
    FetchAllCategories,
    FetchAllProducts,
    FetchAllProductByCategory,
    FetchAllLuxuryHair,
    FetchAllHumanHair,
    FetchAllHumanHairBlend,
    FetchAllBraids,
    FetchAllAccessories,
    FetchAllProductById,
    AddCart,
    FetchCartInformation,
    RemoveItemById,
    DeleteCartItemsByUniqueCode,
    ConfirmOrders,
    FetchCustomerOrder,
    ConfirmDelivery,
    FetchMyOrder
}