"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const zod_1 = require("zod");
const AppError_1 = require("../utils/AppError");
function validate(schema) {
    return async (req, _res, next) => {
        try {
            const parsed = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            // Update request with parsed/cleaned values
            req.body = parsed.body ?? req.body;
            req.query = parsed.query ?? req.query;
            req.params = parsed.params ?? req.params;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const formattedErrors = error.errors.map((err) => ({
                    field: err.path.join('.').replace(/^(body|query|params)\./, ''),
                    message: err.message,
                }));
                return next(AppError_1.AppError.badRequest('Validation failed', formattedErrors));
            }
            next(error);
        }
    };
}
//# sourceMappingURL=validate.middleware.js.map