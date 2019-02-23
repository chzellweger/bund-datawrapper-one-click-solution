"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const json2csv_1 = require("json2csv");
const config_1 = require("../../config/config");
const url = config_1.default.dataSource;
const bern = config_1.default.bern;
function getData(voteId) {
    return __awaiter(this, void 0, void 0, function* () {
        const vote = parseInt(voteId) - 1;
        return node_fetch_1.default(url, {
            headers: {
                Accept: 'application/json'
            }
        })
            .then((res) => __awaiter(this, void 0, void 0, function* () {
            const contentType = res.headers.get('content-type');
            console.log(contentType);
            if (contentType === 'application/octet-stream') {
                let s = yield res.text();
                s = s.trim();
                const json = JSON.parse(s);
                return json;
            }
            else if (contentType === 'application/json') {
                return res.json();
            }
            else {
                throw new Error(`content type unknown. Type: ${contentType}`);
            }
        }))
            .then((data) => {
            const voteData = data.kantone[bern]['vorlagen'][vote];
            return voteData;
        })
            .catch((error) => {
            return error;
        });
    });
}
function shapeDataToJson(data) {
    const output = data.gemeinden.map(shapeGemeinde);
    return output;
}
function handleSpecialCasesJson(data, input) {
    const specialCases = Object.keys(config_1.default.specialCasesMap).map((el) => parseInt(el));
    const handledSpecialCases = specialCases.map((el) => handleSpecialCase(el, data));
    return [...input, ...handledSpecialCases];
}
function dataToCsv(data) {
    const headers = config_1.default.dataColumnHeaders;
    const fields = [
        headers.code,
        headers.name,
        headers.yesInPercent,
        headers.yesAbsolute,
        headers.noAbsolute,
        headers.participationInPercent
    ];
    const csvOutput = json2csv_1.parse(data, { fields });
    return csvOutput;
}
function shapeGemeinde(g) {
    const h = config_1.default.dataColumnHeaders;
    return {
        [h['code']]: g.geoLevelnummer,
        [h['name']]: g.geoLevelname,
        [h['yesInPercent']]: g.resultat.jaStimmenInProzent || 0,
        [h['yesAbsolute']]: g.resultat.jaStimmenAbsolut || 0,
        [h['noAbsolute']]: g.resultat.neinStimmenAbsolut || 0,
        [h['participationInPercent']]: g.resultat.stimmbeteiligungInProzent || 0
    };
}
function handleSpecialCase(specialCase, data) {
    const specialCasesMap = config_1.default.specialCasesMap;
    const h = config_1.default.dataColumnHeaders;
    const specialCaseMappedNumber = specialCasesMap[specialCase]['number'];
    const mappedGemeinde = data.gemeinden.find((el) => {
        return specialCaseMappedNumber.toString() === el.geoLevelnummer;
    });
    return {
        [h['code']]: specialCase.toString(),
        [h['name']]: specialCasesMap[specialCase]['name'],
        [h['yesInPercent']]: mappedGemeinde.resultat.jaStimmenInProzent || 0,
        [h['yesAbsolute']]: mappedGemeinde.resultat.jaStimmenAbsolut || 0,
        [h['noAbsolute']]: mappedGemeinde.resultat.neinStimmenAbsolut || 0,
        [h['participationInPercent']]: mappedGemeinde.resultat.stimmbeteiligungInProzent || 0
    };
}
exports.default = {
    getData,
    shapeDataToJson,
    shapeGemeinde,
    handleSpecialCasesJson,
    handleSpecialCase,
    dataToCsv
};
//# sourceMappingURL=dataHandlers.js.map