"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const Organization_model_1 = require("../models/Organization.model");
const User_model_1 = require("../models/User.model");
const AppError_1 = require("../utils/AppError");
class OrganizationService {
    static async getOrganization(organizationId) {
        const org = await Organization_model_1.Organization.findById(organizationId).populate('ownerId', 'name email');
        if (!org) {
            throw AppError_1.AppError.notFound('Organization not found');
        }
        return org;
    }
    static async updateOrganization(organizationId, data) {
        const org = await Organization_model_1.Organization.findById(organizationId);
        if (!org) {
            throw AppError_1.AppError.notFound('Organization not found');
        }
        if (data.name)
            org.name = data.name;
        await org.save();
        return org;
    }
    static async getMembers(organizationId) {
        return User_model_1.User.find({ organizationId }).select('name email role avatar createdAt');
    }
    static async inviteMember(organizationId, data) {
        const existing = await User_model_1.User.findOne({ email: data.email.toLowerCase() });
        if (existing) {
            throw AppError_1.AppError.conflict('User with this email already exists');
        }
        const member = await User_model_1.User.create({
            name: data.name,
            email: data.email.toLowerCase(),
            role: data.role || 'user',
            organizationId,
            isVerified: true,
            password: 'TempPassword123!', // Can be reset by user
        });
        return {
            id: member._id,
            name: member.name,
            email: member.email,
            role: member.role,
        };
    }
}
exports.OrganizationService = OrganizationService;
//# sourceMappingURL=organization.service.js.map