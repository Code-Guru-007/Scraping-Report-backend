require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
const path = require('path');
const normattivaRouter = require('./routes/normattiva')
const normattivaLocalRouter = require('./routes/normattiva_local')
const defFinanzeItRouter = require('./routes/def.finanze.it')
// console.log('env',process.env.DB_PASSWORD)

//db connection
const dbUser = "gianluca";
const dbPassword = "ipeli1d98&*#}p)Ni3)%";
const dbName = "scrapereport";
// const dbHost = "127.0.0.1";
const dbHost = "188.245.216.211";
const mongoURI = `mongodb://${dbUser}:${encodeURIComponent(dbPassword)}@${dbHost}:27017/${dbName}?authSource=admin`;

console.log(mongoURI)

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

//Schema


//bodyParser
server.use(cors());
server.use(express.json());
server.use(morgan('default'));
// server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));
server.use('/api/normative', normattivaRouter.router);
server.use('/api/sentenze_cassazione', normattivaLocalRouter.router);
server.use('/api/def.finanze.it', defFinanzeItRouter.router);

// server.use('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'build','index.html'))
// })



server.listen(process.env.PORT, () => {
  console.log('server started');
});
