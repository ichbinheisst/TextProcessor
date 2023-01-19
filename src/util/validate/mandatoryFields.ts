export function checkMandatory(input: any, institutionInputs?: string[], useit?: boolean, customInputs?: boolean) {
    if (!useit) {
        return { block: false }
    }
    if (!institutionInputs) {
        console.error("function validate/index.ts/UpdaterValidator/checkMandatory expected an array of string with required  params but undefined has been passed")
        return { block: true, error: "required inputs not passed" }
    }

    if (!Array.isArray(institutionInputs)) {
        console.error("second params was expected to be and array of strings " + typeof (institutionInputs) + "was received")
        return { block: true, error: "" }

    }
    let arrayInputs: string[] = []
    let value;

    if (!customInputs) {
        for (const key in input) {
            arrayInputs.push(key)
        }
    } else {
        for (const key in input) {
            const checkOptional = institutionInputs.some((el) => {
                return el == key
            })

            if (checkOptional) {
                arrayInputs.push(key)
            }
        }
    }


    if (arrayInputs.length != institutionInputs.length) {
        const stringArray = JSON.stringify(institutionInputs)
        return { result: [], error: `${stringArray}  required field or only required`, block: true }

    }
    let valid = true
    let invalidInput;
    institutionInputs.forEach(nativeInput => {
        const arraysCompared = arrayInputs.some((input) => {
            return input == nativeInput
        })
        if (!arraysCompared) {
            invalidInput = nativeInput
            valid = false
        }
    });

    if (!valid) {
        return { error:"do you mean? " +  invalidInput , block: true }
    }

    return { block: false }


}