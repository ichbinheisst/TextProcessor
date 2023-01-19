import { Request, Response } from 'express'

import SimplePresent from '../../service/dataProcessor/tenses/simplePresent'
import SimplePast from '../../service/dataProcessor/tenses/simplePast'
import SimpleFuture from '../../service/dataProcessor/tenses/simpleFuture'
import Score from '../../service/score'

class Test {

    hello() {
        return "hello world"
    }

    testar(req: Request, res: Response) {
        res.json(this.hello())

    }

    indexPresent(req: Request, res: Response) {
        const { text } = req.body
        if (!text) {
            console.log(req.body)
            res.json("teste")
            return
        }
        const present = new SimplePresent()
        const prepare = present.Prepare(text)
        const result = present.Index(prepare)
        res.json(result)



    }
    getSimplePast(req: Request, res: Response) {
        const { text } = req.body
        const past = new SimplePast()
        const prepare = past.Prepare(text)
        const result = past.Index(prepare)
        res.json(result)

    }


    getFuture(req: Request, res: Response) {
        const { text } = req.body
        const future = new SimpleFuture()
        const prepare = future.Prepare(text)
        const result = future.Index(prepare)
        res.json(result)

    }


     getAll(req: Request, res: Response){
        const { text } = req.body

        const score = new Score()
        const result  = score.JoinResponses(text)
        res.json(result)

     }



}
export default Test

