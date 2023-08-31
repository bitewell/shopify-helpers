export function getGoogleClient(headless: boolean = true, timeout: number = 90000, size: string = 'm'): Scraper{
    let userAgent = shuffle(userAgents)[0]
    let launch: any = {
        timeout,
        headless
    }
    return new Scraper({
        userAgent, // the user agent
        // every possible tbs search option, some examples and more info: http://jwebnet.net/advancedgooglesearch.html
        tbs: {  
            isz: size,  
            // options: l(arge), m(edium), i(cons), etc.
            //itp:  // options: clipart, face, lineart, news, photo
            //ic: ''   // options: color, gray, trans
            //sur:  // options: fmc (commercial reuse with modification), fc (commercial reuse), fm (noncommercial reuse with modification), f (noncommercial reuse)
        },
        puppeteer: launch,
        safe: true
    })
}