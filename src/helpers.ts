import { compareTwoStrings } from 'string-similarity'

export const SIMILARITY_CHECK: number = 0.70

// From UPC utils
export const getLongestString = (listOfStrings) => {
    if(typeof listOfStrings != 'object'){
        return false
    }
    listOfStrings = listOfStrings.filter(string => string).map(string => string.trim()).filter(string => string)
    if(!listOfStrings || listOfStrings.length == 0){
        return false
    }
    return listOfStrings.sort(
        function (a, b) {
            return b.length - a.length
        }
    )[0]
}

export const getListOfDigitsWithFixedSize = (inputString, size = 12) => {
    let intInput = parseInt(inputString)
    let cleanedString = intInput.toString()
    if(isNaN(intInput)){
        return false
    }
    while(cleanedString.length < size){
        cleanedString = "0"+cleanedString
    }
    return cleanedString
}

export const isValidUPC = (inputString) => {
    if(!(typeof inputString == 'string' || typeof inputString == 'number')){
        return false
    }
    inputString = getListOfDigitsWithFixedSize(inputString)
    if(!inputString){
        return false
    }
    let digits = inputString.split('').map(digit => parseInt(digit))
    // TODO: Use this later: let checkDigit = digits.at(-1)
    let sum = 0
    let limit = digits.length
    for (let index = 0; index < limit; index++) {
        if((index+1) % 2 == 0){
            sum += digits[index]
        }else{
            sum += (digits[index] * 3)
        }        
    }

    return sum != 0 && sum % 10 == 0
}

export function getDigitsFromString(inputString){
    const regex = /[0-9]+/gmiusd;
    // Alternative syntax using RegExp constructor
    // const regex = new RegExp('[0-9]+', 'gm')
    let m
    let listOfString = []
    while ((m = regex.exec(inputString)) !== null) {
        ///console.log(m)
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        // The result can be accessed through the `m`-variable.
        m.forEach((match) => {
            listOfString.push(match)
        })
    }

    return getLongestString(listOfString)
}
// END From UPC utils

export function addDaysToDate(days: number = 7) : Date {
    let finalDate : Date = new Date()
    finalDate.setDate(finalDate.getDate() + days)
    return finalDate
}

export function addHoursToDate(hours: number = 1): Date {
    let date : Date = new Date()
    return new Date(new Date(date).setHours(date.getHours() + hours))
}

export function getTimestampFromCreatedAt(created_at: any) : string {
    let date = new Date(created_at)
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
}

export function getTimestamp() : string {
    return new Date().toLocaleDateString("en-US").toString()
}

export function checkSimilar(firstString: string, secondString: string) : number {
    let firstCleaned = getCleanString(firstString).toLowerCase()
    let secondCleaned = getCleanString(secondString).toLowerCase()
    return compareTwoStrings(firstCleaned, secondCleaned)
}

export function isSimilar(firstString: string, secondString: string, howSimilar: number = SIMILARITY_CHECK) : boolean {
    return checkSimilar(firstString, secondString) >= howSimilar
}

export function isEmpty(value: any) : boolean {
    return (value == undefined || value == null || (value && value?.trim()?.length === 0) || value?.length === 0)
}

export function parseNumber(rawNumber: any) : number{
    try {
        let n = parseFloat(rawNumber.replace("$", ""))
        if (isNaN(n)){
            return 0
        }
        return n
    } catch (error) {
        console.error(error)
        return 0
    }
}

export function compareGeneric(key: string) : Function {
    return function ( a: any, b: any ) {
        if ( a[key] < b[key] ){
          return -1
        }
        
        if ( a[key] > b[key] ){
          return 1
        }

        return 0
    }
}

export function getUnix() : string {
    return Math.round(+new Date()/1000).toString()
}

export function getCleanString(input: any) : string{
    try {
        return input.trim() || ''
    } catch (error) {
        console.error(error)
        return ''
    }
}

export function nullObject(original: any, ...args: any) : any {
    try {
        let object = original;
        args.forEach((x: any) => {
            object = object[x]
        })
        return object
    } catch (error) {
        console.error(error)
        return ''
    }
}



export function getLastPart(total: string) : string {
    try{
        return total.split('/')[total.split('/').length - 1]
    }catch (error) {
        console.error(error)
        return ''
    }
}

export function getParams(url: string): any{
    let urlSearchParams = new URLSearchParams(url)
    return Object.fromEntries(urlSearchParams.entries())
}

export function buildUrl(url: string, parameters: any) : string {
    let qs = ""
    for(let key in parameters) {
        let value = parameters[key]
        if(value){
            qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&"
        }
    }
    if (qs.length > 0){
        qs = qs.substring(0, qs.length-1) //chop off last "&"
        url = url + "?" + qs
    }
    return url
}

export function getPageInfo(rawString: string): string {
    if(!rawString || (rawString && !rawString.includes('next'))){
        return ""
    }
    let output: string = ""
    let regex = /page_info=[\S]+/gmiu
    // Alternative syntax using RegExp constructor
    let m
    while ((m = regex.exec(rawString)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++
        }
        
        // The result can be accessed through the `m`-variable.
        for (let index = 0; index < m.length; index++) {
            let match = m[index]
            //console.info(match)
            output = match.replace("page_info=", "").replace('>;', "").trim()
            //console.info(output)
            break
        }
        // m.forEach((match: string, groupIndex: any) => {
            
        //     //console.log(`Found match, group ${groupIndex}: ${match}`)
        // })
    }
    // rel="next"
    return output
}