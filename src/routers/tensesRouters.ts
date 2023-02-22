import { Request, Response, Router } from 'express';
import TensesController from '../controller/Tenses';
import { customCheckField } from '../util/validate';
const routerTenses = Router()

routerTenses.post("/tenses", customCheckField("all", ["tense", "text", "params"]), (req: Request, res: Response) => {
    TensesController.index(req, res)

})
routerTenses.post("/score", customCheckField("all", ["text"]), (req: Request, res: Response) => {
    TensesController.indexAnalyst(req, res)

})

export default routerTenses