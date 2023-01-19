import { actions } from './reducer'
import {
    asyncZipCodeValid,
    zipComparer
} from './actions'
import { checkMandatory } from "./mandatoryFields"


 export async function Validator(inputs: any, areInputsMandatory: boolean, requiredInputs?: string[], costumRequired?: boolean) {
    let Body: any = inputs
    if (areInputsMandatory) {
        let teste = checkMandatory(Body, requiredInputs, areInputsMandatory, costumRequired)
        if (teste.block) {
            return { error: teste.error, block: teste.block }
        }
    }

    for (var input in Body) {
        let value = Body[input]
        let isValid = actions(input, value)
        if (input == "zipCode") {
            if (!Body.street || !Body.state || !Body.city || !Body.district) {
                return { error: "in order to store or update zipcode:street,state,city,district are required params", result: {}, status: 401, block: true }
            }
            const response = await asyncZipCodeValid(value)
            if (!response.valid) {
                return { error: response.error, result: response.response, status: 401, block: true }
            }
            const comparedAdressesWithViaCep = zipComparer(Body, response.response)
            return comparedAdressesWithViaCep
        }
        const result = isValid?.action(isValid.data)
        if (!result?.valid) {
            let response = { error: result?.error, block: true }
            Body = {}
            return response
        }

    }


}