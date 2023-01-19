export interface Zipcode {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string,
    error?: boolean

}

export interface IsValidResponse {
    error?: string,
    response?: Zipcode,
    valid: boolean

}
 export interface ZipComparer {
    error?: string,
    result?: any,
    block?: boolean,
    valid: boolean,
    status?: number,

}