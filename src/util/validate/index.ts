//read readMe.txt
// npm i node-fetch 
// npm i  @types/node-fetch

import { Request, Response, NextFunction } from "express"
import { checkMandatory } from './mandatoryFields';
import { Validator } from './validator'

export function customValidator(isInputsRequired?: boolean, customRequire?: "custom" | "all", requiredInputs?: string[],) {
    const demanding = customRequire == "custom" ? true : false
    return async function (req: Request, res: Response, next: NextFunction) {
        let Body: any = req.body
        const isvalid = await Validator(Body, !isInputsRequired ? false : isInputsRequired, requiredInputs, demanding)
        if (isvalid?.block) {
            return res.status(401).json({ error: isvalid.error, status: 401, result: [] })
        }
        next()
    }
}

//readMe 4)
export function customCheckField( customRequire?: "custom" | "all", requiredInputs?: string[],) {
    const demanding = customRequire == "custom" ? true : false
    return (req: Request, res: Response, next: NextFunction) => {
        const Body = req.body
        const isValid = checkMandatory(Body, requiredInputs, true, demanding)
        if (isValid?.block) {
            return res.status(401).json({ error: isValid.error, status: 401, result: [] })
        }
        next()
    }


}



 