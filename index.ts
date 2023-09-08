import express ,{ Express, NextFunction, Request, Response, urlencoded } from 'express';
const dotenv = require('dotenv');
const authRouter = require('./src/Routes/routes.auth');
const requestRouter = require('./src/Routes/routes.friendrequest');
const messageRouter = require('./src/Routes/routes.message');
const { authenticate } = require('./src/Middleware/middleware.auth');
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
app.use('/api/user/request',authenticate, requestRouter);
app.use("/api/user/conversation/:conversationId/message/", authenticate,messageRouter)


app.listen(port , () => {
     console.log(`[server]: server running on http://localhost:${port}`)
})