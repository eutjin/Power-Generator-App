const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
//
const Redis = require("redis");

const redisClient = Redis.createClient(6379);

router.post("/average", async (req, res) => {
  await redisClient.connect();

  // console.log("check2",req.body)
  let allMetro = req.body.metro;
  // console.log("allMetro", allMetro)
  const api_key = process.env.API_KEY_2;

  const dateKey = `${req.body.year}${req.body.month}`;

  let array = [];

  const value = await redisClient.get(dateKey);
//   console.log("resultss", JSON.parse(value));
  
 

  if(value!=null){
    array=JSON.parse(value);
    console.log("resultss", array);
    redisClient.quit();
    console.log("serving from cache...")
    return res.status(200).json({ success: true, array });

  }else{
    console.log("serving from API call...")
    await Promise.all(
        allMetro.map(async (item) => {
          const response = await fetch(
            `https://bigdata.kepco.co.kr/openapi/v1/powerUsage/houseAve.do?year=${req.body.year}&month=${req.body.month}&metroCd=${item.code}&apiKey=${api_key}&returnType=json`
          );
    
          const data = await response.json();
    
          await array.push(...data.data);
          // array={...array, data}
          // array=[...array, data.data]
          // console.log("getData", data.data)
          // console.log("array",array)
        })
      );
      //    await console.log("array",array)
    
      await redisClient.set(dateKey, JSON.stringify(array));
    
      redisClient.quit();
      return res.status(200).json({ success: true, array });
  }

  //    await redisClient.get(dateKey, (error, value)=>{
  //         if(error) console.log("geterror",error)
  //         if(value!= null){
  //             console.log("parserrrrr",JSON.parse(value))
  //         }else{
  //             console.log("gogoogggo")
  //         }
  //     })
  

  // let url =
  //   `https://bigdata.kepco.co.kr/openapi/v1/powerUsage/houseAve.do?year=${req.body.year}&month=${req.body.month}&metroCd=11&apiKey=Q12Rg5406HgHHO60H1403SfGd36mp02VQ7FnTGxK&returnType=json`;

  // const response = await fetch(url);
  // const data = await response.json();
  // console.log("data_average", data);
  // return res.status(200).json({success: true, data})
});

module.exports = router;
