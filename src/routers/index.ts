import { Router, Request, Response } from "express";
import GlossaryController from "../controller/GlossaryController";
import { customValidator, customCheckField } from '../util/validate'
const routers = Router();
routers.get("/glossary", (req: Request, res: Response) => {
    GlossaryController.indexGlossaryAll(req, res)
})

routers.get("/indexGlossaryByLevel", customCheckField("all", ["level"]), (req: Request, res: Response) => {
    GlossaryController.indexGlossaryByLevel(req, res)
})

routers.get("/indexParams", (req: Request, res: Response) => {
    GlossaryController.indexALLparams(req, res)
})

routers.get("/indexParamsbyName", customCheckField("all", ["subjects"]), (req: Request, res: Response) => {
    GlossaryController.indexByNameParam(req, res)
})
 

          

export default routers