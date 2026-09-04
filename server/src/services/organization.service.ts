import { Organization } from '../models/Organization.model';
import { User } from '../models/User.model';
import { AppError } from '../utils/AppError';
import { IOrganizationDocument } from '../types/models.types';

export class OrganizationService {
  static async getOrganization(organizationId: string): Promise<IOrganizationDocument> {
    const org = await Organization.findById(organizationId).populate('ownerId', 'name email');
    if (!org) {
      throw AppError.notFound('Organization not found');
    }
    return org;
  }

  static async updateOrganization(
    organizationId: string,
    data: { name?: string }
  ): Promise<IOrganizationDocument> {
    const org = await Organization.findById(organizationId);
    if (!org) {
      throw AppError.notFound('Organization not found');
    }

    if (data.name) org.name = data.name;
    await org.save();
    return org;
  }

  static async getMembers(organizationId: string) {
    return User.find({ organizationId }).select('name email role avatar createdAt');
  }

  static async inviteMember(
    organizationId: string,
    data: { name: string; email: string; role?: 'admin' | 'user' }
  ) {
    const existing = await User.findOne({ email: data.email.toLowerCase() });
    if (existing) {
      throw AppError.conflict('User with this email already exists');
    }

    const member = await User.create({
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
