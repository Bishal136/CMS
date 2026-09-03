"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const postSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: [true, 'Post content is required'],
        trim: true,
    },
    mediaUrls: [
        {
            type: String,
        },
    ],
    scheduledAt: {
        type: Date,
        index: true,
    },
    publishedAt: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['draft', 'queued', 'pending-approval', 'approved', 'rejected', 'sent', 'failed'],
        default: 'draft',
        index: true,
    },
    channelIds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Channel',
        },
    ],
    tagIds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Tag',
        },
    ],
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    organizationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
        index: true,
    },
    approvalNotes: [
        {
            authorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
            authorName: { type: String, required: true },
            text: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    rejectionReason: {
        type: String,
    },
    errorMessage: {
        type: String,
    },
    firstComment: {
        type: String,
    },
}, {
    timestamps: true,
});
postSchema.index({ organizationId: 1, status: 1 });
postSchema.index({ organizationId: 1, scheduledAt: 1 });
exports.Post = mongoose_1.default.model('Post', postSchema);
//# sourceMappingURL=Post.model.js.map