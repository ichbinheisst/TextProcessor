import { ISubtitle } from "../interface";
import Base from "../../dataProcessor/main";





class BaseActivity extends Base {

    createArraywithUniqueElements(data: ISubtitle[]): ISubtitle[] {
        const uniqueArray: ISubtitle[] = []
        data.forEach(element => {
            const check: boolean = uniqueArray.some((el) => el?.text == element.text)
            if (!check) {
                uniqueArray.push(element)
            }
        });
        return uniqueArray
    }
    checkValidLengthSentence(data: ISubtitle[], length: number): ISubtitle[] {
        const valiableDataArray: ISubtitle[] = []
        data.forEach((element) => {
            let text = element.text.split(" ")
            if (text.length > length) {
                valiableDataArray.push(element)
            }
        })
        return valiableDataArray

    }


}


export default BaseActivity