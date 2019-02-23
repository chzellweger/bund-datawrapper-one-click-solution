"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/config");
function checkParams(req, res, next) {
    const voteId = req.params.voteId;
    if (voteId > config_1.default.range.toString()) {
        res.status(400).json({
            status: 'failed',
            message: `use a vote id in range, range is 1 to ${config_1.default.range}`
        });
        return;
    }
    if (!Number.isInteger(parseInt(voteId))) {
        res.status(400).json({
            status: 'failed',
            message: `cannot create chart with vote-id ${voteId}. Use an integer as vote-id.`
        });
        return;
    }
    next();
}
exports.checkParams = checkParams;
//# sourceMappingURL=middleware.js.map