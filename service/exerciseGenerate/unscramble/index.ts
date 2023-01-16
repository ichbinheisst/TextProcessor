
import { v4 as uuidv4 } from "uuid";
import { IUnscrambleActivity, ISubtitle, IActivity } from "../interface";
import BaseActivity from "../main";


class Unscramble extends BaseActivity implements IActivity {
    private validLenght: number = 4;
    constructor(lenght: number | null) {
        super()
        if (!lenght) {
            return
        }
        this.validLenght = lenght;
    }
    create(data: ISubtitle[]): IUnscrambleActivity[] {
        const unique = this.createArraywithUniqueElements(data);
        const valid = this.checkValidLengthSentence(unique, this.validLenght);
        const activities = valid.map((element) => {
            return {
                ...element,
                activity: {
                    words: element.text.split(" ").sort().map((wrd) => {
                        return {
                            wordId: uuidv4(),
                            word: wrd
                        }
                    }),
                    answer: element.text.trim()
                },

            }
        }
        )
        return activities;
    }

    CreateFunellParams(data: IUnscrambleActivity[], params: string[]): IUnscrambleActivity[] {
        const paramedResponse: IUnscrambleActivity[] = [];
        data.forEach((element, index) => {
            element.text.split(" ").forEach((wrd) => {
                const checkParam = params.some((param) => param == wrd)
                if (checkParam) {
                    paramedResponse.push(element);
                }
            })
        })

        return paramedResponse;


    }
}

export default Unscramble;




