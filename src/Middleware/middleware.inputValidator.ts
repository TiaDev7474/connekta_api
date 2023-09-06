
import { NextFunction, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";

   const  userValidationRules = () => {
        return checkSchema({
              email: { 
                isEmail: true,
                errorMessage: 'Must be a valid e-mail address', 
              },
              
              password: { 
                 notEmpty: true,
                 isLength: { options:{ min: 8 } } ,
                //  matches: { options: /[-_$#]/ },
              }
          })   
       }
   const  validate = (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            console.log(req.body)
            if(!errors.isEmpty()){
                return res.status(422).json({
                    status:422,
                    errors: errors.array()
                })
            }
            next()
            
    }

module.exports = {
    userValidationRules,
    validate
}