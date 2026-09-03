"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateRoutes = void 0;
const express_1 = require("express");
const template_controller_1 = require("../controllers/template.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const template_validator_1 = require("../validators/template.validator");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', template_controller_1.TemplateController.listTemplates);
router.get('/discover', template_controller_1.TemplateController.listDiscover);
router.post('/', (0, validate_middleware_1.validate)(template_validator_1.createTemplateSchema), template_controller_1.TemplateController.createTemplate);
router.put('/:id', (0, validate_middleware_1.validate)(template_validator_1.updateTemplateSchema), template_controller_1.TemplateController.updateTemplate);
router.delete('/:id', template_controller_1.TemplateController.deleteTemplate);
exports.templateRoutes = router;
//# sourceMappingURL=template.routes.js.map