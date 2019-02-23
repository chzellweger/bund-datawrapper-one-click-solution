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
const handleCharts_1 = require("../../controllers/charts/handleCharts");
router.post('/:voteId', middleware_1.checkParams, (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log(req.params);
    const voteId = req.params.voteId;
    try {
        const publicUrl = yield handleCharts_1.default(voteId);
        const response = {
            status: 'ok',
            payload: req.params,
            chart: publicUrl
        };
        res.json(response);
    }
    catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ status: 'failed', message: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=chartMachine.js.map