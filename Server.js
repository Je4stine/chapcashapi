const Express = require('express');
const morgan = require('morgan');


const app = Express();

app.use(morgan("dev"));

app.get('/', (req, res)=>{
    res.send("<h1> App running </h1>")
})

app.listen(8081, ()=>{
    console.log(" App running at port 8081")
});