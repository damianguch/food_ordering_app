const { uploadProducts, checkIfProductExists, displayUploadedProducts, deleteProduct, editProduct, updateProducts, changeProductStatus } = require('../models/uploadModel')
const { createAppLog } = require('../utils/createLogs');
const { ProductCode } = require('../utils/generateProductCode');
const multer = require("multer");
const upload = require('../utils/upload');
const multipleUpload = require('../utils/multipleUpload');

// upload products
const UploadProducts = async(req, res) => {
    try {
       
        // Image upload using multer
      upload(req, res, async function (err) {
          if (err instanceof multer.MulterError) {
          return res.status(200).json({
              status: "E01",
              success: false,
              message: "Image upload error.",
          });
          } else if (err) {
          return res.status(200).json({
              status: "E01",
              success: false,
              message: "Error occurred while uploading image.",
          });
      }

     // return;
      const imageName = req.file.filename; // file name
      const product_code = await ProductCode(8);
      // get request body
      let data = {
          category: req.body.category,
          product_name: req.body.product_name, 
          description: req.body.description,
          price: req.body.price,
          image: imageName, 
      };

       // validate phone number
       let isProductExists = await checkIfProductExists(product_code);
       if (isProductExists) {
           await createAppLog("Product already exists");
           res.status(200).json({
               status: "E00",
               success: false,
               message: "Product already exists",
           });
           return;
       }

      await uploadProducts(data.product_name, product_code, data.category, data.description, data.price, data.image)
      await createAppLog(JSON.stringify(data)); // add log
      
      return res.status(200).json({
          status: "00",
          success: true,
          message: "Successfully uploaded!",
      });
  });

  } catch (err) {
      await createAppLog(err);
      console.log(err);
      res.status(200).json({
          status: "E01",
          success: false,
          message: "Not successful!",
      });
  }
}

// view products
const DisplayUploadedProducts = async (req, res) => {
    try {
       
        let products = await displayUploadedProducts ();

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
            products: products
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

// delete products
const DeleteProduct = async (req, res) => {
    try {
        
        let data = {
            productid: req.body.productid,
        }
        
        await deleteProduct(data.productid);

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

// change products status
const ChangeProductStatus = async (req, res) => {
    try {
        
        let data = {
            productstatus: req.body.productstatus,
            productid: req.body.productid,
        }

        let statusValue = ''
        
        if(data.productstatus == 1){
            statusValue = 0;
        }
        else if(data.productstatus == 0){
            statusValue = 1;
        }
        
        await changeProductStatus(statusValue, data.productid);

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

// delete products
const EditProduct = async (req, res) => {
    try {
        
        let data = {
            productid: req.body.productid,
        }
        
        let products = await editProduct(data.productid);

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
            products: products
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

// update product
const UpdateProducts = async(req, res) => {
    try {

        let imageName = '';

        // Image upload using multer
      upload(req, res, async function (err) {
          if (err instanceof multer.MulterError) {
          return res.status(200).json({
              status: "E01",
              success: false,
              message: "Image upload error.",
          });
          } else if (err) {
          return res.status(200).json({
              status: "E01",
              success: false,
              message: "Error occurred while uploading image.",
          });
      }

      if (req.body.image == '') {
        imageName = req.body.picture_url; // file name
      }else{
        imageName = req.file.filename; // file name
      }

      // get request body
      let data = {
          productid: req.body.productid,
          category: req.body.category,
          product_name: req.body.product_name, 
          description: req.body.description,
          price: req.body.price,
          image: imageName, 
      };

      await updateProducts(data.product_name, data.category, data.description, data.price, data.image, data.productid)
      await createAppLog(JSON.stringify(data)); // add log
      
      return res.status(200).json({
          status: "00",
          success: true,
          message: "Successfully updated!",
      });
  });

  } catch (err) {
      await createAppLog(err);
      console.log(err);
      res.status(200).json({
          status: "E01",
          success: false,
          message: "Not successful!",
      });
  }
}

// upload product images
const uploadProductImages = async(req, res) => {
    try {
       
        // Image upload using multer
     multipleUpload(req, res, async function (err) {
          if (err instanceof multer.MulterError) {
          return res.status(200).json({
              status: "E01",
              success: false,
              message: "Image upload error.",
          });
          } else if (err) {
          return res.status(200).json({
              status: "E01",
              success: false,
              message: "Error occurred while uploading image.",
          });
      }
      //console.log(req.file.filename)
     // return;
      const imageName = req.file.filename; // file name
      
      // get request body
      let data = {
          product_id: req.body.product_id, 
          images: imageName, 
      };

    //    // validate phone number
    //    let isProductExists = await checkIfProductExists(product_code);
    //    if (isProductExists) {
    //        await createAppLog("Product already exists");
    //        res.status(200).json({
    //            status: "E00",
    //            success: false,
    //            message: "Product already exists",
    //        });
    //        return;
    //    }

      await uploadProducts(data.product_id, data.images)
      await createAppLog(JSON.stringify(data)); // add log
      
      return res.status(200).json({
          status: "00",
          success: true,
          message: "Successfully uploaded!",
      });
  });

  } catch (err) {
      await createAppLog(err);
      console.log(err);
      res.status(200).json({
          status: "E01",
          success: false,
          message: "Not successful!",
      });
  }
}

module.exports = {
    UploadProducts,
    DisplayUploadedProducts,
    DeleteProduct,
    EditProduct,
    UpdateProducts,
    uploadProductImages,
    ChangeProductStatus
}