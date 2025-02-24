require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
const path = require('path');
const ftp = require('ftp');

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

// const ftpClient = new ftp();

// server.get('/api/getpdf', (req, res) => {
//   const { filePath, fileName } = req.query;

//   // Connect to the FTP server
//   ftpClient.connect({
//       host: "109.205.183.137",
//       user: "legal_doc@db-legale.professionista-ai.com",
//       password: "G}SsFa@dB@&3"
//   });

//   // Handle errors on connection failure
//   ftpClient.on('error', (err) => {
//       console.error("FTP Connection Error:", err);
//       if (!res.headersSent) {
//           res.status(500).json({ error: "FTP Connection failed" });
//       }
//   });

//   // When FTP is ready, fetch the file
//   ftpClient.on('ready', () => {
//       ftpClient.get(filePath, (err, stream) => {
//           if (err) {
//               console.error("File not found:", err);
//               if (!res.headersSent) {
//                   res.status(404).json({ error: "File not found" });
//               }
//               ftpClient.end(); // Close FTP connection
//               return;
//           }

//           // Ensure headers are only sent once
//           if (!res.headersSent) {
//               res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
//               res.setHeader('Content-Type', 'application/pdf'); // Adjust for other file types
//               stream.pipe(res);
//           }

//           // Handle FTP stream errors
//           stream.on('error', (streamErr) => {
//               console.error("Stream Error:", streamErr);
//               if (!res.headersSent) {
//                   res.status(500).json({ error: "Error reading file" });
//               }
//               ftpClient.end();
//           });

//           // Ensure FTP connection is closed when streaming ends
//           stream.on('end', () => {
//               ftpClient.end();
//           });
//       });
//   });
// });




server.listen(process.env.PORT, () => {
  console.log('server started');
});
