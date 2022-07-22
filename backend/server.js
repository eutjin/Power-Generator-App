
const path= require('path')
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port=process.env.PORT || 5000


const app = express();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))

app.use('/api/daily', require('./routes/dailyRoutes'))
app.use('/api/consumption', require('./routes/consumptionRoutes'))

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req,res)=>res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
}
else{
    app.get('/', (req,res)=>res.send('set!'))
}

app.listen(port, ()=>console.log(`server started on port ${port}`))