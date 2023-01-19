import Glossary from "../../service/indexer";
import { Request, Response } from 'express'
import { IParams } from "../../interfaces/index"
class GlossaryController {
     private Glossary: Glossary
     constructor() {
          this.Glossary = new Glossary()
     }
     public indexGlossaryAll(req: Request, res: Response): void {
          const response = this.Glossary.getGlossary()
          if (!response) {
               res.status(404).json({ error: "nothing found", status: 404, result: [] })
               return
          }
          res.json(response)

     }
     public indexGlossaryByLevel(req: Request, res: Response): void {
          const { level } = req.body
          const response = this.Glossary.getByLevelGlossary(level)
          if (!response) {
               res.status(404).json({ error: "nothing found", status: 404, result: [] })
               return
          }
          res.json(response)


     }
     indexALLparams(req: Request, res: Response): void {
          const response = this.Glossary.getParams()
          if (!response) {
               res.status(404).json({ error: "nothing found", status: 404, result: [] })
               return
          }
          res.json(response)

     }
     indexByNameParam(req: Request, res: Response): void {
          const { subjects } = req.body         
          const Subjects = subjects.trim().split(",")
          const response = []
          for (let index = 0; index < Subjects.length; index++) {
               const subject = Subjects[index];
               const sbj = this.Glossary.getParamasByname(subject)
               if (sbj.data.length) {
                    response.push(sbj)
               }

          }

          if (!response || !response.length) {
               res.status(404).json({ error: "nothing found", status: 404, result: [] })
               return
          }
          res.json(response)


     }
}


export default new GlossaryController()