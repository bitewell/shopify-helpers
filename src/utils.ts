import axios from "axios"
import { buildUrl, getPageInfo } from "./helpers"
import { sleep } from "./files"

export const defaultTimeout = 9999 * 1000
export const defaultHeaders = {'Content-Type': 'application/json'}

interface IRestResourceResponse{
    pageInfo?: string
}

function successInterceptor(response: any): any {
    return {
        ok: true,
        status: response.status,
        extras: response.headers,
        data: response.data
    }
}

function errorInterceptor(error: any): any {
    console.error(error)
    debugger;
    return {
        ok: false,
        data: error.response
    }
}

export function getAxiosClient(baseURL: string, headers = {}, timeout = defaultTimeout){
    let instance = axios.create({
        baseURL, 
        timeout, 
        headers: { ...defaultHeaders, ...headers }
    })
    instance.interceptors.response.use(successInterceptor, errorInterceptor)
    return instance
}

const timeout: number = 999999 * 1000
const headers: any = {'Content-Type': 'application/json'}

export function getClient(domain: string, apiKey: string, version: string = '2023-07') : any{
    const baseURL: string = `https://${domain}.myshopify.com/admin/api/${version}`
    return getAxiosClient(baseURL, { ...headers, 'X-Shopify-Access-Token': apiKey }, timeout)
}

export async function postFromPath(client: any, path: string, data: any) : Promise<any>{
    return await client.post(path, data)
}

export async function deleteFromPath(client: any, path: string) : Promise<any>{
    return await client.delete(path)
}

export async function putFromPath(client: any, path: string, data: any) : Promise<any>{
    return await client.put(path, data)
}

export async function getFromPath(client: any, path: string, resource: string) : Promise<any>{
    let response: any = await client.get(path)
    if(!response.ok){
        return false
    }
    return response?.data[resource]
}

export async function getFromResource(client: any, path: string,  queries: any) : Promise<IRestResourceResponse>{
    let url = buildUrl(path, { limit: 250, ...queries })
    console.log(url)
    let response = await client.get(url)
    if(!response.ok){
        console.error(response.error)
        return {
            pageInfo: ""
        }
    }
    let nextUrl = response?.extras?.link
    let pageInfo = getPageInfo(nextUrl) || ""
    let rows = response.data
    return {
        ...rows,
        pageInfo
    }
}

export async function getAllFromResource(client: any, path: string, resource: string, headers: any = {}) : Promise<Array<any>>{
    let allRows = []
    let pageInfo = ""
    let index = 1
    do{
        console.info(index)
        let response = await getFromResource(client, path, { ...headers, page_info: pageInfo })
        if(response[resource]){
            allRows = allRows.concat(response[resource])
        }
        pageInfo = response.pageInfo
        index++
        await sleep(0.25)
    }while(pageInfo)
    return allRows
}

