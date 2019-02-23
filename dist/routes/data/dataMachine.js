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
//eslint-disable-next-line
const router = require('express').Router();
const middleware_1 = require("../../services/middleware/middleware");
const handleData_1 = require("../../controllers/data/handleData");
const dataHandlers_1 = require("../../services/data/dataHandlers");
router.get('/:voteId', middleware_1.checkParams, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const voteId = req.params.voteId;
    try {
        const requestDataType = req.query['data-type'];
        const data = yield handleData_1.handleData(voteId);
        res.set({ 'Access-Control-Allow-Origin': '*' });
        if (requestDataType === 'csv') {
            const csv = dataHandlers_1.default.dataToCsv(data);
            res.set({ 'Content-Disposition': `attachment filename=abstimmung${voteId}.csv` });
            res.send(csv);
        }
        else if (requestDataType === 'json') {
            res.json(data);
        }
        else {
            throw new Error('requested data-type is unknown. request "?data-type=<json|csv]>"');
        }
    }
    catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ status: 'failed', message: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=dataMachine.js.map