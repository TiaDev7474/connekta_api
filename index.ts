import express ,{ Express, NextFunction, Request, Response, urlencoded } from 'express';
const dotenv = require('dotenv');
const cors = require('cors');
const authRouter = require('./src/Routes/routes.auth');
const requestRouter = require('./src/Routes/routes.friendrequest');
const messageRouter = require('./src/Routes/routes.message');
const conversationRouter = require('./src/Routes/routes.conversation');
const userRouter = require('./src/Routes/routes.user');
const { authenticate } = require('./src/Middleware/middleware.auth');
require('./src/Database/db');
dotenv.config();
//init mongoDB connection
const app:Express = express();

const port = process.env.PORT || 8000;

//middlewares
app.use(cors({
     origin:["http://localhost:5173","https://conneckta.onrender.com"],
     methods:['GET','POST','PUT','DELETE'],
}))
app.use(express.json())
app.get('/',( req: Request , res: Response , next: NextFunction ) => {
     res.send('Connekta api  with typescript ')
     
})

//routes definition
app.use('/api/auth',authRouter);
app.use('/api/user/request',authenticate, requestRouter);
app.use('/api/user/conversation', authenticate, conversationRouter);
app.use("/api/user/conversation/message", authenticate,messageRouter);
app.use("/api/user", authenticate, userRouter);


app.listen(port , () => {
     console.log(`[server]: server running on http://localhost:${port}`)
})