const express =require('express')
const router= express.Router()
const fetch = require("node-fetch");

router.post('/average', async (req, res)=>{
    console.log("check2",req.body)
    let allMetro= req.body.metro
    // console.log("allMetro", allMetro)
const api_key= process.env.API_KEY_2;
    let array=[]
    await Promise.all(allMetro.map(async (item)=>{
       
        
       const response=await fetch(
        `https://bigdata.kepco.co.kr/openapi/v1/powerUsage/houseAve.do?year=${req.body.year}&month=${req.body.month}&metroCd=${item.code}&apiKey=${api_key}&returnType=json`)
       
        const data= await response.json()

       await array.push(...data.data)
        // array={...array, data}
        // array=[...array, data.data]
        // console.log("getData", data.data)
        // console.log("array",array)


        }))
       await console.log("array",array)
        return res.status(200).json({success: true, array})


    // let url =
    //   `https://bigdata.kepco.co.kr/openapi/v1/powerUsage/houseAve.do?year=${req.body.year}&month=${req.body.month}&metroCd=11&apiKey=Q12Rg5406HgHHO60H1403SfGd36mp02VQ7FnTGxK&returnType=json`;

    // const response = await fetch(url);
    // const data = await response.json();
    // console.log("data_average", data);
    // return res.status(200).json({success: true, data})
})



module.exports= router