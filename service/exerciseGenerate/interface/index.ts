export interface ITimer {
    from: number,
    to: number
}

export interface IWord {
    word: string,
    wordId: string// uuid type
}

export interface ISubtitle {
    time: ITimer,
    selected: boolean,
    text: string,
    translation: string// fix mispell in the app
}


export interface IUnscramble {

    words: Array<IWord>
    answer: string

}
 export interface IActivity {
    create: (data: ISubtitle[]) => any
}

export interface IUnscrambleActivity extends ISubtitle {
    activity: IUnscramble

}


