export function shuffeV2(inputList: Array<any>): Array<any>{
    return inputList
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export function shuffle(array: Array<any>) : Array<any> {
    let currentIndex: number = array.length
    let temporaryValue: any = 0
    let randomIndex: any = 0
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        //
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array
}

export const userAgents: Array<string> = [
    'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)',
    'Chrome/51.0.2704.103 Safari/537.36',
    'Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)',
]

export interface IGoogleResult{
    url: string
    source: string
    title: string
}

export function getRandomNumber(factor: number = 1): number{
    return parseFloat(Math.random().toFixed(2)) * factor
}

export async function sleep(seconds: number = getRandomNumber()) : Promise<boolean>{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, seconds * 1000)
    })
}