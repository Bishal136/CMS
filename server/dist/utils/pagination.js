"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationOptions = getPaginationOptions;
function getPaginationOptions(pageQuery, limitQuery, defaultLimit = 10, maxLimit = 100) {
    let page = parseInt(String(pageQuery), 10);
    if (isNaN(page) || page < 1) {
        page = 1;
    }
    let limit = parseInt(String(limitQuery), 10);
    if (isNaN(limit) || limit < 1) {
        limit = defaultLimit;
    }
    else if (limit > maxLimit) {
        limit = maxLimit;
    }
    const skip = (page - 1) * limit;
    return { page, limit, skip };
}
//# sourceMappingURL=pagination.js.map