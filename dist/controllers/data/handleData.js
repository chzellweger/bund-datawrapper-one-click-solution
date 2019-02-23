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
const dataHandlers_1 = require("../../services/data/dataHandlers");
exports.handleData = function handleData(voteId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rawData = yield dataHandlers_1.default.getData(voteId);
            const shapedData = dataHandlers_1.default.shapeDataToJson(rawData);
            const output = dataHandlers_1.default.handleSpecialCasesJson(rawData, shapedData);
            console.log(output);
            return output;
        }
        catch (error) {
            return error;
        }
    });
};
//# sourceMappingURL=handleData.js.map