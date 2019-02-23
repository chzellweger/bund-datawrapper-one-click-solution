"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//eslint-disable-next-line
const router = require('express').Router();
exports.router = router;
const chartMachine_1 = require("./charts/chartMachine");
const dataMachine_1 = require("./data/dataMachine");
router.use('/machine', chartMachine_1.default);
router.use('/data', dataMachine_1.default);
//# sourceMappingURL=routes.js.map