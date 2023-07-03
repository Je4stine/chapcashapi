const bodyParser = require('body-parser');
const Express = require('express');
const morgan = require('morgan');
const MessageController = require('./Controllers/messages.controller');
const AuthController = require('./Controllers/auth.controller');


const app = Express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(Express.urlencoded({ extended: true }));


// Routes 
app.post('/api/signin', AuthController.signin);
app.post('/api/signup', AuthController.signup);
app.post('/api/reset', AuthController.changePassword);

app.get('/api/allMessages', MessageController.allMessages);
app.get('/api/complete', MessageController.complete);
app.get('/api/pending', MessageController.pending);
app.post('/api/add', MessageController.add);

app.get('/', (req, res)=>{
    res.send("<h1> App running </h1>")
})

app.listen(8081, ()=>{
    console.log(" App running at port 8081")
});