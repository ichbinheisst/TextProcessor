import { Ifiltered, IPrepare, Iscore, IParams, IGlossary, tense } from '../../interfaces';
import Base from '../dataProcessor/main';
import Glossary from '../indexer';
import SimpleFuture from '../dataProcessor/tenses/simpleFuture';
import PastPerfect from '../dataProcessor/tenses/pastPerfect';
import SimplePresent from '../dataProcessor/tenses/simplePresent';
import PresentPerfect from '../dataProcessor/tenses/presentPerfect';
import SimplePastContinous from '../dataProcessor/tenses/simplePastContinous';
import SimplePresentContinous from '../dataProcessor/tenses/simpleContinous';
import SimplePast from '../dataProcessor/tenses/simplePast';
import FistCondition from '../dataProcessor/conditional/firstConditional';
import SecondCondition from '../dataProcessor/conditional/secondConditional';


class Score extends Base {
    calculatePorcentage(total: number, concluded: number) {
        if (!total || !concluded) {
            return 0;
        }
        let n1 = concluded * 10;
        return Math.round((n1 / total) * 10);
    }
    FilterTenses(data: IPrepare[], tense: tense[]): Ifiltered[] {

        const response = tense.map(element => {
            let res: Ifiltered;
            switch (element) {
                case "simple present":
                    res = new SimplePresent().Index(data)
                    break
                case "simple past":
                    res = new SimplePast().Index(data)
                    break
                case "future-will":
                    res = new SimpleFuture().Index(data)
                    break
                case "present continous":
                    res = new SimplePresentContinous().Index(data)
                    break
                case "past continuous":
                    res = new SimplePastContinous().Index(data)
                    break
                case "first condition":
                    res = new FistCondition().Index(data)
                    break
                case "second condition":
                    res = new SecondCondition().Index(data)


            }
            res.subject = element
            return res

        });


        return response



    }
    JoinResponses(text: string): Ifiltered[] {
        const txt = this.Prepare(text)
        const response: Ifiltered[] = []
        const glos = new Glossary()
        glos.getGlossary().forEach((param) => {
            const responseTenses = this.FilterTenses(txt, param.tenses)
            responseTenses.forEach((rs) => response.push(rs))
            param.content.forEach((par) => {
                const params = glos.getParamsbyId(par.id)
                const responseParams = this.findByParams(txt, params.data)
                responseParams.subject = par.name
                response.push(responseParams)
            })
        })
        return response
    }
    score(text: string) {
        const fullLength = this.Prepare(text).length
        const res: Ifiltered[] = this.JoinResponses(text)
        const response: string[] = []

        res.forEach((items) => {
            const value = items.sentences.length
            const porcentage = this.calculatePorcentage(fullLength, value)
            const resText = `subject: ${items.subject},o texto possuí ${items.numberOfTargetWords} palavras do assunto um em texto de ${fullLength} linhas, sendo ${items.sentences.length} com conteúdo, ou ${porcentage}% de aproveitamento`

            response.push(resText)

        })

        return response




    }
}

export default Score



