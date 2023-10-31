const axios = require('axios');
const qs = require("qs");
const { createAppLog } = require('../utils/createLogs');
const { createVisitorRecord, websiteReport } = require('../models/visitorModel');

// create account
const CreateStatistics = async (req, res) => {
    try {

        let data = {
            visitor_id: req.body.visitor_id,
        };

        let d = new Date();
        let dateArr = d.toString().split(' ');
      
        let day = dateArr[0];
        let month =  dateArr[1];
        let days =  dateArr[2];
        let year =  dateArr[3];

        await createAppLog("create account information" + JSON.stringify(data));

        // save data
        await createVisitorRecord(data.visitor_id, day, month, year);        

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

// website report
const WebsiteReport = async(req, res) => {
    try {
              
        let reports = await websiteReport();

        return res.status(200).json({
            status: "00",
            success: true,
            message: "Success",
            todayViews: reports[0].todayViews,
            monthlyViews: reports[0].monthlyViews,
            yearlyViews: reports[0].yearlyViews
        });

    } catch (err) {
        await createAppLog(err);
        console.log(err);
        res.status(200).json({
            status: "E00",
            success: false,
            message: "Error",
        });
    }
}

module.exports = {
    CreateStatistics,
    WebsiteReport
}