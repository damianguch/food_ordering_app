const axios = require('axios');
const qs = require("qs");
const { loginLogic, checkIfPhoneNumberExists, checkUsers, profileName} = require("../models/loginModel");
const { createAppLog } = require('../utils/createLogs');
const { createAccount } = require('../models/userModel');
const { encryptPasswordWithBcrypt } = require("../utils/passwordEncrypt");
const { generateToken } = require('../utils/jwt');

// create account
const CreateAccount = async (req, res) => {
    try {

        let data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            delivery_address: req.body.delivery_address,
            password: req.body.password,
        };

        await createAppLog("create account information" + JSON.stringify(data));

        if (data.firstname == "") {
            await createAppLog("Firstname cannot be empty!" + JSON.stringify(data.firstname));
            res.status(200).json({
                status: "E00",
                success: false,
                message: "Firstname cannot be empty!",
            });
            return;
        }
        if (data.lastname == "") {
            await createAppLog("Lastname cannot be empty!" + JSON.stringify(data.lastname));
            res.status(200).json({
                status: "E00",
                success: false,
                message: "Lastname cannot be empty!",
            });
            return;
        }

        if (data.phone == "") {
            await createAppLog("Phone cannot be empty!" + JSON.stringify(data.phone));
            res.status(200).json({
                status: "E00",
                success: false,
                message: "Phone cannot be empty!",
            });
            return;
        }
        if (data.delivery_address == "") {
            await createAppLog("delivery address cannot be empty!" + JSON.stringify(data.delivery_address));
            res.status(200).json({
                status: "E00",
                success: false,
                message: "delivery address cannot be empty!",
            });
            return;
        }

        if (data.password == "") {
            await createAppLog("Password cannot be empty!" + JSON.stringify(data.password));
            res.status(200).json({
                status: "E00",
                success: false,
                message: "Password cannot be empty!",
            });
            return;
        }

          // validate phone number
          let isPhoneExists = await checkIfPhoneNumberExists(data.phone);
          if (isPhoneExists) {
              res.status(200).json({
                  status: "E00",
                  success: false,
                  message: "Phone number already exists",
              });
              return;
          }

        let encryptPassword = await encryptPasswordWithBcrypt(data.password);
        // save data
        await createAccount(data.firstname, data.lastname, data.phone, data.delivery_address, encryptPassword, 2);

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Successful!",
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

// function to login, generate jwt and verified.
const Login = async (req, res) => {
    try {

        let data = {
            phone: req.body.phone,
            password: req.body.password,
        };

        await createAppLog("Login information" + JSON.stringify(data));

        if (data.phone == "") {
            await createAppLog("Email cannot be empty!" + JSON.stringify(data.phone));
            res.status(200).json({
                status: "E00",
                success: false,
                message: "Email cannot be empty!",
            });
            return;
        }

        if (data.password == "") {
            await createAppLog("Password cannot be empty!" + JSON.stringify(data.password));
            res.status(200).json({
                status: "E00",
                success: false,
                message: "Password cannot be empty!",
            });
            return;
        }

        //console.log(data.phone);
          // validate phone number
          let isPhoneExists = await checkIfPhoneNumberExists(data.phone);
          if (!isPhoneExists) {
              res.status(200).json({
                  status: "E00",
                  success: false,
                  message: "Login not successful. Please check your phone number",
              });
              return;
          }


        let user_data = '';
        
        // verify user login information
        let verify = await loginLogic(data.phone, data.password);

        // check user role
        let user_role = await checkUsers(data.phone);

        if (user_role[0].roles == 1) {
            user_data = await profileName(data.phone); // get admin profile detail
        }
        if (user_role[0].roles == 2) {
            user_data = await profileName(data.phone); // get user profile detail
        }

        if(verify){
            // Generate a jwt token with the user payload
            const token = generateToken(data);
            await createAppLog("Login success" + JSON.stringify(token));

            return res.status(200).json({
                status: "00",
                success: true,
                message: "Login successful!",
                token: token,
                profile_name: user_data,
            });
        }
        else {
            await createAppLog("Login not successful! Please check your password." + JSON.stringify(data));
            res.status(200).json({
                status: "E00",
                success: false,
                message: "Login not successful! Please check your password.",
            });
            return;
        }

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Login not successful!",
        });
    }

};

// function to login out
const Signout = async (req, res) => {
    try {

        let data = {
            userid: req.body.userid,
        };         

       // await updateOnlineStatusLogout(data.userid); // update user online status to 0
        await createAppLog("user log out" + JSON.stringify(data));

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Logout successful!",
        });

    } catch (err) {
        await createAppLog("Error: " + err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
        });
    }

};

module.exports = {
    Login,
    CreateAccount,
    Signout,
}