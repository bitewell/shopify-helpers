"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageInfo = exports.buildUrl = exports.getParams = exports.getLastPart = exports.nullObject = exports.getCleanString = exports.getUnix = exports.compareGeneric = exports.parseNumber = exports.isEmpty = exports.isSimilar = exports.checkSimilar = exports.getTimestamp = exports.getTimestampFromCreatedAt = exports.addHoursToDate = exports.addDaysToDate = exports.getDigitsFromString = exports.isValidUPC = exports.getListOfDigitsWithFixedSize = exports.getLongestString = exports.SIMILARITY_CHECK = void 0;
const string_similarity_1 = require("string-similarity");
exports.SIMILARITY_CHECK = 0.70;
const getLongestString = (listOfStrings) => {
    if (typeof listOfStrings != 'object') {
        return false;
    }
    listOfStrings = listOfStrings.filter(string => string).map(string => string.trim()).filter(string => string);
    if (!listOfStrings || listOfStrings.length == 0) {
        return false;
    }
    return listOfStrings.sort(function (a, b) {
        return b.length - a.length;
    })[0];
};
exports.getLongestString = getLongestString;
const getListOfDigitsWithFixedSize = (inputString, size = 12) => {
    let intInput = parseInt(inputString);
    let cleanedString = intInput.toString();
    if (isNaN(intInput)) {
        return false;
    }
    while (cleanedString.length < size) {
        cleanedString = "0" + cleanedString;
    }
    return cleanedString;
};
exports.getListOfDigitsWithFixedSize = getListOfDigitsWithFixedSize;
const isValidUPC = (inputString) => {
    if (!(typeof inputString == 'string' || typeof inputString == 'number')) {
        return false;
    }
    inputString = (0, exports.getListOfDigitsWithFixedSize)(inputString);
    if (!inputString) {
        return false;
    }
    let digits = inputString.split('').map(digit => parseInt(digit));
    let sum = 0;
    let limit = digits.length;
    for (let index = 0; index < limit; index++) {
        if ((index + 1) % 2 == 0) {
            sum += digits[index];
        }
        else {
            sum += (digits[index] * 3);
        }
    }
    return sum != 0 && sum % 10 == 0;
};
exports.isValidUPC = isValidUPC;
function getDigitsFromString(inputString) {
    const regex = /[0-9]+/gmiusd;
    let m;
    let listOfString = [];
    while ((m = regex.exec(inputString)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match) => {
            listOfString.push(match);
        });
    }
    return (0, exports.getLongestString)(listOfString);
}
exports.getDigitsFromString = getDigitsFromString;
function addDaysToDate(days = 7) {
    let finalDate = new Date();
    finalDate.setDate(finalDate.getDate() + days);
    return finalDate;
}
exports.addDaysToDate = addDaysToDate;
function addHoursToDate(hours = 1) {
    let date = new Date();
    return new Date(new Date(date).setHours(date.getHours() + hours));
}
exports.addHoursToDate = addHoursToDate;
function getTimestampFromCreatedAt(created_at) {
    let date = new Date(created_at);
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
}
exports.getTimestampFromCreatedAt = getTimestampFromCreatedAt;
function getTimestamp() {
    return new Date().toLocaleDateString("en-US").toString();
}
exports.getTimestamp = getTimestamp;
function checkSimilar(firstString, secondString) {
    let firstCleaned = getCleanString(firstString).toLowerCase();
    let secondCleaned = getCleanString(secondString).toLowerCase();
    return (0, string_similarity_1.compareTwoStrings)(firstCleaned, secondCleaned);
}
exports.checkSimilar = checkSimilar;
function isSimilar(firstString, secondString, howSimilar = exports.SIMILARITY_CHECK) {
    return checkSimilar(firstString, secondString) >= howSimilar;
}
exports.isSimilar = isSimilar;
function isEmpty(value) {
    var _a;
    return (value == undefined || value == null || (value && ((_a = value === null || value === void 0 ? void 0 : value.trim()) === null || _a === void 0 ? void 0 : _a.length) === 0) || (value === null || value === void 0 ? void 0 : value.length) === 0);
}
exports.isEmpty = isEmpty;
function parseNumber(rawNumber) {
    try {
        let n = parseFloat(rawNumber.replace("$", ""));
        if (isNaN(n)) {
            return 0;
        }
        return n;
    }
    catch (error) {
        console.error(error);
        return 0;
    }
}
exports.parseNumber = parseNumber;
function compareGeneric(key) {
    return function (a, b) {
        if (a[key] < b[key]) {
            return -1;
        }
        if (a[key] > b[key]) {
            return 1;
        }
        return 0;
    };
}
exports.compareGeneric = compareGeneric;
function getUnix() {
    return Math.round(+new Date() / 1000).toString();
}
exports.getUnix = getUnix;
function getCleanString(input) {
    try {
        return input.trim() || '';
    }
    catch (error) {
        console.error(error);
        return '';
    }
}
exports.getCleanString = getCleanString;
function nullObject(original, ...args) {
    try {
        let object = original;
        args.forEach((x) => {
            object = object[x];
        });
        return object;
    }
    catch (error) {
        console.error(error);
        return '';
    }
}
exports.nullObject = nullObject;
function getLastPart(total) {
    try {
        return total.split('/')[total.split('/').length - 1];
    }
    catch (error) {
        console.error(error);
        return '';
    }
}
exports.getLastPart = getLastPart;
function getParams(url) {
    let urlSearchParams = new URLSearchParams(url);
    return Object.fromEntries(urlSearchParams.entries());
}
exports.getParams = getParams;
function buildUrl(url, parameters) {
    let qs = "";
    for (let key in parameters) {
        let value = parameters[key];
        if (value) {
            qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
        }
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1);
        url = url + "?" + qs;
    }
    return url;
}
exports.buildUrl = buildUrl;
function getPageInfo(rawString) {
    if (!rawString || (rawString && !rawString.includes('next'))) {
        return "";
    }
    let output = "";
    let regex = /page_info=[\S]+/gmiu;
    let m;
    while ((m = regex.exec(rawString)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        for (let index = 0; index < m.length; index++) {
            let match = m[index];
            output = match.replace("page_info=", "").replace('>;', "").trim();
            break;
        }
    }
    return output;
}
exports.getPageInfo = getPageInfo;
