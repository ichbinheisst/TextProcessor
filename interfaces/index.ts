
interface Timerscript {
    from: number,
    to: number
}

interface IPrepare {
    text: string[]
}

interface Ifiltered {
    targetWords: string[]
    sentences: string[]
    numberOfTargetWords: number
}


interface Iscore {
    bruto: number,
    unique: number
}

interface Script {
    text: string,
    time: Timerscript,
    selected: boolean,
    translate: boolean, 
    translation?:string|undefined

}


interface IParams {
    data: string[],
    type: string,
    level: string, 
    id:number
}





interface ITense {
    Index(data: IPrepare[]): Ifiltered,
}


export { Script, Timerscript, IPrepare,Ifiltered ,Iscore, IParams, ITense}