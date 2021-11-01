const express= require('express');
const dotenv= require('dotenv');
const app = express();
dotenv.config({path:'./config.env'});
const PORT=process.env.PORT
require('./db/conn');
app.use(express.json());
app.use(require('./router/auth'))

 
// Middleware

const middleware = (req,res,next) => {
        console.log("hello middleware");
        next();
}


app.get('/',( req, res ) => {
    res.send('hello from the express js side again helloy');
});
app.get('/about',middleware,( req, res ) => {
    res.send('hello from the express about side');
});
app.listen(PORT,()=>{
    console.log(`listening at port ${PORT}`);
});