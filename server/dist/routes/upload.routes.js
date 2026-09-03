"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRoutes = void 0;
const express_1 = require("express");
const upload_controller_1 = require("../controllers/upload.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const upload_1 = require("../config/upload");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.post('/avatar', upload_1.upload.single('avatar'), upload_controller_1.UploadController.uploadFile);
router.post('/media', upload_1.upload.single('media'), upload_controller_1.UploadController.uploadFile);
router.post('/template-cover', upload_1.upload.single('templateCover'), upload_controller_1.UploadController.uploadFile);
exports.uploadRoutes = router;
//# sourceMappingURL=upload.routes.js.map