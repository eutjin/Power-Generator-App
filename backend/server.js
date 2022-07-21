const express = require('express');
const cors = require('cors');

const port=process.env.PORT || 5000


const app = express();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))

app.use('/api/daily', require('./routes/dailyRoutes'))
app.use('/api/consumption', require('./routes/consumptionRoutes'))

app.listen(port, ()=>console.log(`server started on port ${port}`))