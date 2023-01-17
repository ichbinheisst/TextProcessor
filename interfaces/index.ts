
interface Timerscript {
    from: number,
    to: number
}

interface IPrepare {
    text: string[]
}

interface Ifiltered {
    subject?: string
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
    translation?: string | undefined

}


interface IParams {
    data: string[],
    type: string,
    level: string,
    id: number
}





interface ITense {
    Index(data: IPrepare[]): Ifiltered,
}



type tense =
    "simple present" |
    "present continous" |
    "simple past" |
    "future-will" |
    "past continuous"


    
export interface ISubject {
    name: string,
    id: number
}


export interface IGlossary {
    level: string,
    content: ISubject[],
    tenses: tense[],
    vocabulary: string[]
}

export { Script, Timerscript, IPrepare, Ifiltered, Iscore, IParams, ITense }