const bodyParser = require('body-parser');
const Express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const MessageController = require('./Controllers/messages.controller');
const AuthController = require('./Controllers/auth.controller');
const ImageController = require('./Controllers/images.controller');
const Messages = require('./Models/Messages');


const app = Express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(Express.urlencoded({ extended: true }));

const fs = require('fs');
const path = require('path');

app.use('/uploads', Express.static(path.join(__dirname, 'uploads')));


const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination directory where files will be saved
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix); // Specify the filename for the uploaded file
        },
      });

      const upload = multer({ storage: storage });


app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

   



// Routes 
app.post('/api/signin', AuthController.signin);
app.post('/api/signup', AuthController.signup);
app.post('/api/reset', AuthController.changePassword);
app.get('/api/getall', AuthController.getUsers);

app.get('/api/allMessages', MessageController.allMessages);
app.get('/api/complete', MessageController.complete);
app.get('/api/pending', MessageController.pending);
app.post('/api/add', MessageController.add);
app.put('/api/confirm', MessageController.confirm);

app.put('/api/users/:email/image', upload.single("image"), ImageController.addImageByUsername);
app.post('/api/image/getImage', ImageController.getUser);

app.post('/paymentDetails', async(req, res)=>{
  try{
    const {TransID, TransTime, MSISDN, TransAmount, FirstName, BillRefNumber, status }=req.body;
    const MessageAdd = await Messages.create({
      TransID, 
      TransTime, 
      MSISDN, 
      TransAmount, 
      FirstName, 
      BillRefNumber,
      Msgstatus:false
    });

    res.status(200).json({
      message:"Received"
    });

    } catch(error){
      res.status(500).json({
        message: "Internal Server error"
      })
      console.log(error)
  }
})

app.get('/', (req, res)=>{
    res.send("<h1> App running </h1>")
})

app.listen(8081, ()=>{
    console.log(" App running at port 8081")
});
