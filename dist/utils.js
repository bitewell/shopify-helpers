"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFromResource = exports.getFromResource = exports.getFromPath = exports.putFromPath = exports.deleteFromPath = exports.postFromPath = exports.getClient = exports.getAxiosClient = exports.defaultHeaders = exports.defaultTimeout = void 0;
const axios_1 = require("axios");
const helpers_1 = require("./helpers");
const files_1 = require("./files");
exports.defaultTimeout = 9999 * 1000;
exports.defaultHeaders = { 'Content-Type': 'application/json' };
function successInterceptor(response) {
    return {
        ok: true,
        status: response.status,
        extras: response.headers,
        data: response.data
    };
}
function errorInterceptor(error) {
    console.error(error);
    debugger;
    return {
        ok: false,
        data: error.response
    };
}
function getAxiosClient(baseURL, headers = {}, timeout = exports.defaultTimeout) {
    let instance = axios_1.default.create({
        baseURL,
        timeout,
        headers: Object.assign(Object.assign({}, exports.defaultHeaders), headers)
    });
    instance.interceptors.response.use(successInterceptor, errorInterceptor);
    return instance;
}
exports.getAxiosClient = getAxiosClient;
const timeout = 999999 * 1000;
const headers = { 'Content-Type': 'application/json' };
function getClient(domain, apiKey, version = '2023-07') {
    const baseURL = `https://${domain}.myshopify.com/admin/api/${version}`;
    return getAxiosClient(baseURL, Object.assign(Object.assign({}, headers), { 'X-Shopify-Access-Token': apiKey }), timeout);
}
exports.getClient = getClient;
function postFromPath(client, path, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield client.post(path, data);
    });
}
exports.postFromPath = postFromPath;
function deleteFromPath(client, path) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield client.delete(path);
    });
}
exports.deleteFromPath = deleteFromPath;
function putFromPath(client, path, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield client.put(path, data);
    });
}
exports.putFromPath = putFromPath;
function getFromPath(client, path, resource) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield client.get(path);
        if (!response.ok) {
            return false;
        }
        return response === null || response === void 0 ? void 0 : response.data[resource];
    });
}
exports.getFromPath = getFromPath;
function getFromResource(client, path, queries) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let url = (0, helpers_1.buildUrl)(path, Object.assign({ limit: 250 }, queries));
        console.log(url);
        let response = yield client.get(url);
        if (!response.ok) {
            console.error(response.error);
            return {
                pageInfo: ""
            };
        }
        let nextUrl = (_a = response === null || response === void 0 ? void 0 : response.extras) === null || _a === void 0 ? void 0 : _a.link;
        let pageInfo = (0, helpers_1.getPageInfo)(nextUrl) || "";
        let rows = response.data;
        return Object.assign(Object.assign({}, rows), { pageInfo });
    });
}
exports.getFromResource = getFromResource;
function getAllFromResource(client, path, resource, headers = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let allRows = [];
        let pageInfo = "";
        let index = 1;
        do {
            console.info(index);
            let response = yield getFromResource(client, path, Object.assign(Object.assign({}, headers), { page_info: pageInfo }));
            if (response[resource]) {
                allRows = allRows.concat(response[resource]);
            }
            pageInfo = response.pageInfo;
            index++;
            yield (0, files_1.sleep)(0.25);
        } while (pageInfo);
        return allRows;
    });
}
exports.getAllFromResource = getAllFromResource;
