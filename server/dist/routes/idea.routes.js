"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ideaRoutes = void 0;
const express_1 = require("express");
const idea_controller_1 = require("../controllers/idea.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const idea_validator_1 = require("../validators/idea.validator");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', idea_controller_1.IdeaController.listIdeas);
router.post('/', (0, validate_middleware_1.validate)(idea_validator_1.createIdeaSchema), idea_controller_1.IdeaController.createIdea);
router.post('/groups', idea_controller_1.IdeaController.createGroup);
router.put('/:id', (0, validate_middleware_1.validate)(idea_validator_1.updateIdeaSchema), idea_controller_1.IdeaController.updateIdea);
router.delete('/:id', idea_controller_1.IdeaController.deleteIdea);
exports.ideaRoutes = router;
//# sourceMappingURL=idea.routes.js.map