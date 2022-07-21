const express =require('express')
const router= express.Router()
const fetch = require("node-fetch");

router.post('/powerTrading', async (req, res)=>{
    console.log("check",req.body.apiDate)
const {apiDate}=req.body;
    let url =
    `http://apis.data.go.kr/B552115/PowerTradingResultInfo/getPowerTradingResultInfo?serviceKey=hcXb%2FHslI8a0xCxDPh%2BU9zrCMXTX%2BefXDcOnSoVibf0Cz24SwSoFHAT7W2QgtXl9Cb8VrLV2Vxsgtbmm7zU2Gw%3D%3D&pageNo=1&numOfRows=600&dataType=JSON&tradeDay=${apiDate}`;//some issues were solved by removig s from https
console.log("url", url)

    const response = await fetch(url);
    console.log("res", response)
    const data = await response.json();
    console.log("data1", data);
    return res.status(200).json({success: true, data})
})



module.exports= router