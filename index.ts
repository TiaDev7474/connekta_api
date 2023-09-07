import express ,{ Express, NextFunction, Request, Response, urlencoded } from 'express';
const dotenv = require('dotenv');
const authRouter = require('./src/Routes/routes.auth');
const requestRouter = require('./src/Routes/routes.friendrequest');
const { authenticate } = require('../Middleware/middleware.auth');
require('./src/Database/db')
dotenv.config();
//init mongoDB connection
const app:Express = express();

const port = process.env.PORT || 8000;

//middlewares
app.use(express.json())
app.get('/',( req: Request , res: Response , next: NextFunction ) => {
     res.send('Connekta api  with typescript ')
     
})


//routes definition
app.use('/api/auth',authRouter);
app.use('/api/request',authenticate, requestRouter);


app.listen(port , () => {
     console.log(`[server]: server running on http://localhost:${port}`)
})