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
const fetch = require('node-fetch');
const config_1 = require("../../config/config");
const handleData_1 = require("../../controllers/data/handleData");
const dataHandlers_1 = require("../data/dataHandlers");
function createChart() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('creating chart...');
        const url = config_1.default.url;
        const headers = config_1.default.headers;
        const chartId = yield fetch(`${url}/charts`, {
            headers, method: 'POST'
        })
            .then((res) => __awaiter(this, void 0, void 0, function* () {
            const json = yield res.json();
            return json.data[0].id;
        }))
            .catch((error) => error);
        return chartId;
    });
}
function addData(voteId, chartId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('adding data....');
        const url = config_1.default.url;
        const headers = config_1.default.headers;
        const data = yield handleData_1.handleData(voteId);
        const csv = dataHandlers_1.default.dataToCsv(data);
        console.log(csv);
        const result = yield fetch(`${url}/charts/${chartId}/data`, {
            headers,
            method: 'PUT',
            body: csv
        })
            .then((res) => __awaiter(this, void 0, void 0, function* () {
            const json = yield res.json();
            return json;
        }))
            .catch((error) => error);
        return result;
    });
}
function editChart(voteId, chartId) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = config_1.default.titles[voteId];
        const url = config_1.default.url;
        const headers = config_1.default.headers;
        const chartStyle = Object.assign(config_1.default.chartConfig, { title });
        const result = yield fetch(`${url}/charts/${chartId}`, {
            headers,
            method: 'PUT',
            body: JSON.stringify(chartStyle)
        })
            .then((res) => __awaiter(this, void 0, void 0, function* () {
            const json = yield res.json();
            return json;
        }))
            .catch((error) => error);
        return result;
    });
}
function publishChart(chartId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('tryin\' to publish your chart...');
        const url = config_1.default.url;
        const headers = config_1.default.headers;
        const result = yield fetch(`${url}/charts/${chartId}/publish`, {
            headers,
            method: 'POST'
        })
            .then((res) => res.json())
            .then((json) => {
            console.log(json);
            return {
                chartId: json.data.id,
                publicUrl: json.data.publicUrl,
                embed: json.data.metadata.publish['embed-codes'],
                publishedAt: json.data.publishedAt
            };
        })
            .catch((error) => error);
        return result;
    });
}
exports.default = {
    createChart,
    addData,
    editChart,
    publishChart
};
//# sourceMappingURL=chartHandlers.js.map