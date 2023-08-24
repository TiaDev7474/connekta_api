import express ,{ Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config();

const app:Express = express();

const port = process.env.PORT || 8000;

app.get('/',( req: Request , res: Response , next: NextFunction ) => {
     res.send('Connekta api  with typescript ')
     
})

app.listen(port , () => {
     console.log(`[server]: server running on http://localhost:${port}`)
})