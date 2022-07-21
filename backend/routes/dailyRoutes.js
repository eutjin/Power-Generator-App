const express =require('express')
const router= express.Router()
const fetch = require("node-fetch");

router.post('/powerTrading', async (req, res)=>{
    console.log("check",req.body.apiDate)
const {apiDate}=req.body;
const api_key=process.env.API_KEY_1;
    let url =
    `http://apis.data.go.kr/B552115/PowerTradingResultInfo/getPowerTradingResultInfo?serviceKey=${api_key}&pageNo=1&numOfRows=600&dataType=JSON&tradeDay=${apiDate}`;//some issues were solved by removig s from https
console.log("url", url)

    const response = await fetch(url);
    console.log("res", response)
    const data = await response.json();
    console.log("data1", data);
    return res.status(200).json({success: true, data})
})



module.exports= router