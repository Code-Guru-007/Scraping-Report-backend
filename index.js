require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
const path = require('path');
const productRouter = require('./routes/product')
// console.log('env',process.env.DB_PASSWORD)

//db connection
main();

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/scrapereport');
    console.log('database connected')
  } catch (error) {
    console.log(error)
  }
}
//Schema


//bodyParser
server.use(cors());
server.use(express.json());
server.use(morgan('default'));
// server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));
server.use('/products',productRouter.router);

// server.use('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'build','index.html'))
// })



server.listen(process.env.PORT, () => {
  console.log('server started');
});
