export declare const defaultTimeout: number;
export declare const defaultHeaders: {
    'Content-Type': string;
};
interface IRestResourceResponse {
    pageInfo?: string;
}
export declare function getAxiosClient(baseURL: string, headers?: {}, timeout?: number): import("axios").AxiosInstance;
export declare function getClient(domain: string, apiKey: string, version?: string): any;
export declare function postFromPath(client: any, path: string, data: any): Promise<any>;
export declare function deleteFromPath(client: any, path: string): Promise<any>;
export declare function putFromPath(client: any, path: string, data: any): Promise<any>;
export declare function getFromPath(client: any, path: string, resource: string): Promise<any>;
export declare function getFromResource(client: any, path: string, queries: any): Promise<IRestResourceResponse>;
export declare function getAllFromResource(client: any, path: string, resource: string, headers?: any): Promise<Array<any>>;
export {};
