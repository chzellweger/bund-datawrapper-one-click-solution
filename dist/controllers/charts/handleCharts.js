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
const chartHandlers_1 = require("../../services/charts/chartHandlers");
const handleCharts = (voteId) => __awaiter(this, void 0, void 0, function* () {
    console.log('spinning up chart-machine...');
    try {
        const chartId = yield chartHandlers_1.default.createChart();
        console.log('now your chart has the id: ' + chartId);
        console.log('now: add data...');
        yield chartHandlers_1.default.addData(voteId, chartId);
        console.log('now, style the chart...');
        yield chartHandlers_1.default.editChart(voteId, chartId);
        console.log('now, publish your chart...');
        const publicUrl = yield chartHandlers_1.default.publishChart(chartId);
        console.log(publicUrl.publicUrl);
        return publicUrl;
    }
    catch (error) {
        return error;
    }
});
exports.default = handleCharts;
//# sourceMappingURL=handleCharts.js.map