import {
    isCityValid,
    isCountryValid,
    isEmailValid,
    isCodeValid,
    isIdValid,
    isStateValid,
    isNameValid,
    isUrlValid,
    isDistrictValid,
    isStreetValid,
    isNumberValid,
    isPictureValid,
    isTelephoneValid,
    asyncZipCodeValid
} from './actions';


 export function actions(key: any, data: any) {
    switch (key) {
        case "id":
            return {
                data: data,
                action: isIdValid,

            };
        case "country":

            return {
                data: data,
                action: isCountryValid,

            };
        case "state":
            return {
                data: data,
                action: isStateValid,

            };
        case "city":
            return {
                data: data,
                action: isCityValid,

            };
        case "district":
            return {
                data: data,
                action: isDistrictValid,

            };
        case "street":
            return {
                data: data,
                action: isStreetValid,
            };
        case "number":
            return {
                data: data,
                action: isNumberValid,

            };


        case "name":
            return {
                data: data,
                action: isNameValid,

            };
        case "telephone":
            return {
                data: data,
                action: isTelephoneValid,

            };

        case "number":
            return {
                data: data,
                action: isNumberValid,

            };


        case "code":
            return {
                data: data,
                action: isCodeValid,

            };

        case "url":
            return {
                data: data,
                action: isUrlValid,

            };
        case "email":
            return {
                data: data,
                action: isEmailValid,

            };
        case "picture":
            return {
                data: data,
                action: isPictureValid,

            };



        default:

            //console.error("param + ", + key + "is invalid")
            return


    }




}
