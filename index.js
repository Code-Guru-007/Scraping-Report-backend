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

const ftpClient = new ftp();

// server.get('/api/getpdf', (req, res) => {
//   const { filePath, fileName } = req.query;

//   // Connect to the FTP server
//   ftpClient.connect({
//       host: "109.205.183.137",
//       user: "legal_doc@db-legale.professionista-ai.com",
//       password: "G}SsFa@dB@&3"
//   });
const ftpConfig = {
  host: "109.205.183.137",
  user: "legal_doc@db-legale.professionista-ai.com",
  password: "G}SsFa@dB@&3"
};

// Serve PDF file from FTP server
server.get('/api/pdf', async (req, res) => {
  const {pdfPath} = req.query;
  const fileName = 'yourfile.pdf'; // Replace with the actual file name on the FTP server
  const tempFilePath = path.join(__dirname, 'tempfile.pdf');

  const client = new FTPClient();

  try {
    // Connect to the FTP server
    await client.access(ftpConfig);
    
    // Download the PDF file from FTP to a temporary location
    await client.downloadTo(tempFilePath, pdfPath);

    // Serve the file as a response
    res.sendFile(tempFilePath, (err) => {
      if (err) {
        res.status(500).send('Error sending the file.');
      }

      // Delete the temporary file after sending
      fs.unlink(tempFilePath, (err) => {
        if (err) {
          console.error('Failed to delete temporary file', err);
        }
      });
    });
  } catch (err) {
    console.error('Error fetching PDF from FTP:', err);
    res.status(500).send('Error fetching PDF from FTP server.');
  } finally {
    client.close();
  }
});


server.listen(process.env.PORT, () => {
  console.log('server started');
});
