import Score from "../../service/score";
import { Request, Response } from "express"
import { Ifiltered, IParams } from '../../interfaces'
import { Params } from '../../service/dataProcessor/params'
import Base from "../../service/dataProcessor/main"
import Glossary from "../../service/indexer";


type Tense =
    "simple present" |
    "present continous" |
    "simple past" |
    "future-will" |
    "past continuous"

class TensesController extends Base {
    Tense: Score
    private params: string[] = []
    constructor() {
        super()
        this.Tense = new Score()
        this.queryOptionsParams()
    }
    private tenses: Tense[] = ["simple present", "present continous", "simple past", "future-will", "past continuous"]
    private available = { "available_params": this.params, "available_tenses": this.tenses }
    private queryOptionsParams(): void {
        this.params = Params.map((param) => param.type)
    }
    private createArrayOfTenses(tense: string): Tense[] {
        const params: Tense[] = []
        this.tenses.forEach((tens) => {
            if (tense.includes(tens)) {
                params.push(tens)
            }
        })
        return params
    }
    private queryTenses(tenses: string, text: string): Ifiltered[] {
        const arrayofTenses = this.createArrayOfTenses(tenses)
        return this.Tense.FilterTenses(this.Tense.Prepare(text), arrayofTenses)
    }
    private createIParamsArray(params: string[]): IParams[] {
        const response: any[] = []
        const glossary = new Glossary()
        params.forEach((param) => {
            response.push(glossary.getParamasByname(param))
        })
        return response
    }

    private createArrayOfParams(param: string): string[] {
        const params: string[] = []
        this.params.forEach((item) => {
            if (param.includes(item)) {
                params.push(item)
            }
        })
        return params

    }
    private queryParams(params: string, text: string): Ifiltered[] {
        const arrayofParams: string[] = this.createArrayOfParams(params)
        const paramslist: IParams[] = this.createIParamsArray(arrayofParams)
        const response: Ifiltered[] = []
        paramslist.forEach((param) => {
            response.push(this.findByParams(this.Prepare(text), param.data))
        })
        return response

    }

    index(req: Request, res: Response): void {
        const { text, params, tense } = req.body
        const tensesResponse = this.queryTenses(tense, text)
        const paramsResponse = this.queryParams(params, text)
        if (!tensesResponse.length &&  paramsResponse.length) {
            res.status(404).json({ result: [], available: this.available })
            return
        }
        res.json({ result: [...tensesResponse, ...paramsResponse], "available_params": this.params, "available_tenses": this.tenses })

    }

}
export default new TensesController()

