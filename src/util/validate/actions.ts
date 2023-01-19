import { Zipcode, IsValidResponse,ZipComparer } from './interfaces'
import { countries } from './countryList';
import fetch from "node-fetch";
export function isEmailValid(email: string): IsValidResponse {
    if (!email) {
        return { error: `missing params email`, valid: false }
    }
    var mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email.trim().match(mailformat)) {
        return { error: `email is not an email`, valid: false }

    }
    return { valid: true }
}
export function isCountryValid(country: string): IsValidResponse {
    if (!country) {
        return { error: `missing params ${country} `, valid: false }
    }
    const checkCountry = countries.some((element) => {
        return element.name == country.trim()
    })
    if (!checkCountry) {

        return { error: "country is not a valid country", valid: false }
    }
    return { valid: true }

}
export function isCityValid(name: string): IsValidResponse {
    if (!name) {
        return { error: `missing param city`, valid: false }
    }

    if (typeof (name) != 'string') {
        return { error: `city type is expected to be string type`, valid: false }
    }

    if (!name.trim()) {
        return { error: `city cannot be empty`, valid: false }
    }
    return { valid: true }

}
export function isStateValid(state: string, country?: string): IsValidResponse {

    if (!state) {
        return { error: `${state} is not an FU`, valid: false }
    }
    if (typeof (state) != "string") {
        return { error: `${state} is not an FU`, valid: false }
    }
    state.toUpperCase().trim()

    if (state.length > 3) {
        return { error: `${state} is not an FU`, valid: false }
    }

    if (country == "Brazil" || "Brasil") {
        const BrazilianStates = [
            "AC",
            "AP",
            "AM",
            "BA",
            "CE",
            "DF",
            "ES",
            "GO",
            "MT",
            "MS",
            "MG",
            "PA",
            "PI",
            "RJ",
            "RN",
            "RS",
            "RO",
            "RR",
            "SC",
            "SP",
            "SE",
            "TO"]

        const isValid = BrazilianStates.some((uf) => {
            return uf == state
        })
        if (!isValid) {
            return { error: `${state} is not a Brazilian Federal Unity`, valid: false }
        }
        return { valid: true }
    }

    return { valid: true }



}
export function isCodeValid(code: string): IsValidResponse {
    if (!code) {
        return { error: `missing param code`, valid: false }
    }
    if (typeof (code) != "string") {
        return { error: "code type not valid,code must be a string type", valid: false }
    }
    if (code.length < 10) {
        return { error: "code too short,code must have  at least 11 characteres", valid: false }
    }
    return { valid: true }
}
export function isIdValid(id: string): IsValidResponse {
    if (!id) {
        return { error: `missing param id`, valid: false }
    }

    if (typeof (id) != 'string') {
        return { error: `id type is expected to be string type`, valid: false }
    }

    if (!id.trim()) {
        return { error: `id cannot be empty`, valid: false }
    }
    return { valid: true }


}
export function isNameValid(name: string): IsValidResponse {
    if (!name) {
        return { error: `missing param name`, valid: false }
    }

    if (typeof (name) != 'string') {
        return { error: `name type is expected to be string type`, valid: false }
    }

    if (!name.trim()) {
        return { error: `name cannot be empty`, valid: false }
    }
    return { valid: true }

}
export function isUrlValid(url: string): IsValidResponse {
    if (!url) {
        return { error: `missing url param`, valid: false }
    }

    if (typeof (url) != 'string') {
        return { error: `name type is expected to be string type`, valid: false }
    }

    if (!url.trim()) {
        return { error: `url cannot be empty`, valid: false }
    }

    // make a regex to check it 
    return { valid: true }
}
export function isDistrictValid(distric: string): IsValidResponse {
    if (!distric) {
        return { error: `missing distric param`, valid: false }
    }

    if (typeof (distric) != 'string') {
        return { error: `district type is expected to be string type`, valid: false }
    }

    if (!distric.trim()) {
        return { error: `distric cannot be empty`, valid: false }
    }

    // make a regex to check it 
    return { valid: true }
}

export function isStreetValid(street: string): IsValidResponse {
    if (!street) {
        return { error: `missing street param`, valid: false }
    }

    if (typeof (street) != 'string') {
        return { error: `street type is expected to be string type`, valid: false }
    }

    if (!street.trim()) {
        return { error: `street cannot be empty`, valid: false }
    }

    // make a regex to check it 
    return { valid: true }
}
export function isNumberValid(NumberAdress: string | number): IsValidResponse {





    if (!NumberAdress) {
        return { error: `missing street param`, valid: false }
    }

    if (typeof (NumberAdress) != 'string') {
        return { error: `Number type is expected to be string type`, valid: false }
    }



    if (!NumberAdress.trim()) {
        return { error: `street cannot be empty`, valid: false }
    }

    // make a regex to check it 
    return { valid: true }
}
export function isPictureValid(street: string): IsValidResponse {
    if (!street) {
        return { error: `missing picture param`, valid: false }
    }

    if (typeof (street) != 'string') {
        return { error: `picture type is expected to be string type`, valid: false }
    }

    if (!street.trim()) {
        return { error: `picture cannot be empty`, valid: false }
    }

    // make a regex to check it 
    return { valid: true }
}
export function isTelephoneValid(telephone: number | string): IsValidResponse {
    console.log("attention telephone is set in  Brazilian format")

    if (!telephone) {
        return { error: "missing telephone params", valid: false }

    }

    if (typeof (telephone) == "string") {
        return { error: "telephone invalid, only numbers must be passed", valid: false }
    }
    let numberString = String(telephone)
    if (numberString.length != 8) {
        return { error: "telephone invalid,it must have 8 characters", valid: false }
    }

    return {
        valid: true
    }

}
 
export async function asyncZipCodeValid(zipCode: string): Promise<IsValidResponse> {
    if (!zipCode) {
        return { error: "missing zipcode argument", valid: false }
    }
    const checkLengh = String(zipCode)
    if (checkLengh.length != 8) {
        return { error: "zipcode invalid, zipcode must have 8 numbers ", valid: false }
    }
    try {
        const data = await fetch(`https://viacep.com.br/ws//${zipCode}/json/`)
        const response = await data.json()
        if (response.erro) {
            return { error: "zip code not found", valid: false, }
        }


        return { response, valid: true, }


    } catch (error) {
        return { error: "zip code not found", valid: false, }
    }


}

 export function zipComparer(Body: any, zip: Zipcode | undefined): ZipComparer {
    let { street, city, state, district } = Body


    if (!zip) {
        return { error: "", result: {}, valid: false, status: 401, block: true }

    }
    if (city != zip.localidade) {
   
        return { error: "city doesn't match zip code", result: {}, valid: false, status: 401, block: true }
    }
    if (street != zip.logradouro) {
        return { error: "street doesn't match zip code", result: {}, valid: false, status: 401, block: true }
    }

    if (state != zip.uf) {
        return { error: "State doesn't match zip code", result: {}, valid: false, status: 401, block: true }
    }
    if (district != zip.bairro) {
        return { error: "district doesn't match zip code", result: {}, valid: false, status: 401, block: true }
    }

    return { block: false, valid: true, status: 200 }


}