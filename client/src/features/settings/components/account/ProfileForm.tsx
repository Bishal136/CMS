import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAppDispatch } from '@/app/hooks';
import { updateUser } from '@/features/auth/slices/authSlice';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useResendVerificationEmailMutation,
  useUploadAvatarMutation,
} from '../../services/settingsApi';
import { Toggle } from '@/components/ui/Toggle';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Toast } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import {
  AlertTriangle,
  Info,
  X,
  User,
  ExternalLink,
  Camera,
  Loader2,
} from 'lucide-react';

export const ProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user: authUser } = useAuth();
  const { toasts, addToast, removeToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Queries & Mutations
  const { data: profileRes } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation();
  const [resendVerification, { isLoading: isResendingVerification }] = useResendVerificationEmailMutation();
  const [uploadAvatar, { isLoading: isUploadingAvatar }] = useUploadAvatarMutation();

  const currentUser = profileRes?.data || authUser;

  // Local form states
  const [name, setName] = useState('');
  const [initialName, setInitialName] = useState('');

  const [email, setEmail] = useState('');
  const [initialEmail, setInitialEmail] = useState('');

  const [backupEmail, setBackupEmail] = useState('');
  const [initialBackupEmail, setInitialBackupEmail] = useState('');

  const [isVerified, setIsVerified] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  // Banner visibility states
  const [showBackupBanner, setShowBackupBanner] = useState(true);
  const [show2faBanner, setShow2faBanner] = useState(true);

  // Password Modal states
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Sync state with fetched user data
  useEffect(() => {
    if (currentUser) {
      const uName = currentUser.name || '';
      const uEmail = currentUser.email || '';
      const uBackupEmail = currentUser.backupEmail || '';
      const uVerified = Boolean(currentUser.isVerified ?? currentUser.emailVerified);
      const u2FA = Boolean(currentUser.twoFactorEnabled);
      const uAvatar = currentUser.avatar || '';

      setName(uName);
      setInitialName(uName);

      setEmail(uEmail);
      setInitialEmail(uEmail);

      setBackupEmail(uBackupEmail);
      setInitialBackupEmail(uBackupEmail);

      setIsVerified(uVerified);
      setTwoFactorEnabled(u2FA);
      setAvatarUrl(uAvatar);
    }
  }, [currentUser]);

  // Handlers
  const handleSaveName = async () => {
    if (!name.trim()) {
      addToast({ type: 'error', message: 'Name cannot be empty' });
      return;
    }
    try {
      const res = await updateProfile({ name: name.trim() }).unwrap();
      if (res.data) {
        dispatch(updateUser({ name: res.data.name }));
        setInitialName(res.data.name);
      }
      addToast({ type: 'success', message: 'Name updated successfully' });
    } catch (err: any) {
      addToast({
        type: 'error',
        message: err?.data?.message || 'Failed to update name',
      });
    }
  };

  const handleSaveEmail = async () => {
    if (!email.trim()) {
      addToast({ type: 'error', message: 'Email cannot be empty' });
      return;
    }
    try {
      const res = await updateProfile({ email: email.trim() }).unwrap();
      if (res.data) {
        dispatch(updateUser({ email: res.data.email, isVerified: res.data.isVerified }));
        setInitialEmail(res.data.email);
        setIsVerified(Boolean(res.data.isVerified));
      }
      addToast({
        type: 'success',
        message: 'Email updated successfully. Please verify your new email address.',
      });
    } catch (err: any) {
      addToast({
        type: 'error',
        message: err?.data?.message || 'Failed to update email address',
      });
    }
  };

  const handleSaveBackupEmail = async () => {
    try {
      const res = await updateProfile({ backupEmail: backupEmail.trim() }).unwrap();
      if (res.data) {
        dispatch(updateUser({ backupEmail: res.data.backupEmail }));
        setInitialBackupEmail(res.data.backupEmail || '');
      }
      addToast({ type: 'success', message: 'Backup email updated successfully' });
    } catch (err: any) {
      addToast({
        type: 'error',
        message: err?.data?.message || 'Failed to update backup email',
      });
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast({ type: 'error', message: 'Please select a valid image file' });
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const uploadRes = await uploadAvatar(formData).unwrap();
      const uploadedUrl = uploadRes.data.url;

      const profileUpdateRes = await updateProfile({ avatar: uploadedUrl }).unwrap();
      if (profileUpdateRes.data) {
        dispatch(updateUser({ avatar: uploadedUrl }));
        setAvatarUrl(uploadedUrl);
      }
      addToast({ type: 'success', message: 'Profile photo updated successfully' });
    } catch (err: any) {
      addToast({
        type: 'error',
        message: err?.data?.message || 'Failed to upload profile photo',
      });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerification().unwrap();
      addToast({
        type: 'success',
        message: 'Verification email has been resent to your inbox.',
      });
    } catch (err: any) {
      addToast({
        type: 'error',
        message: err?.data?.message || 'Failed to resend verification email',
      });
    }
  };

  const handleToggle2FA = async (checked: boolean) => {
    setTwoFactorEnabled(checked);
    try {
      const res = await updateProfile({ twoFactorEnabled: checked }).unwrap();
      if (res.data) {
        dispatch(updateUser({ twoFactorEnabled: res.data.twoFactorEnabled }));
      }
      addToast({
        type: 'success',
        message: checked
          ? 'Two-factor authentication enabled'
          : 'Two-factor authentication disabled',
      });
    } catch (err: any) {
      setTwoFactorEnabled(!checked);
      addToast({
        type: 'error',
        message: err?.data?.message || 'Failed to update two-factor authentication',
      });
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      await updatePassword({
        currentPassword: currentPassword || undefined,
        newPassword,
      }).unwrap();

      addToast({ type: 'success', message: 'Password changed successfully' });
      setIsPasswordModalOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordError(err?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Toast notifications container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              title={toast.title}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>

      {/* 1. Unverified Email Banner */}
      {!isVerified && (
        <div className="bg-[#FEF6E7] border border-[#FDE6B8] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-neutral-800 leading-snug">
              <span className="font-bold">Verify your email:</span> An email has been sent to your inbox to verify your email address.
            </div>
          </div>
          <button
            type="button"
            onClick={handleResendVerification}
            disabled={isResendingVerification}
            className="shrink-0 bg-[#FFECC2] hover:bg-[#FEE3A2] active:scale-[0.98] text-neutral-900 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#F6D28B] transition-all cursor-pointer disabled:opacity-50"
          >
            {isResendingVerification ? (
              <span className="inline-flex items-center gap-1.5">
                <Loader2 size={13} className="animate-spin" /> Sending...
              </span>
            ) : (
              'Re-send Verification Email'
            )}
          </button>
        </div>
      )}

      {/* 2. Backup Email Recommendation Banner */}
      {showBackupBanner && !backupEmail && (
        <div className="bg-[#EBF5FF] border border-[#D0E7FE] rounded-xl px-4 py-3 flex items-center justify-between text-xs sm:text-sm text-[#1E429F] shadow-2xs">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[#1E429F] shrink-0" />
            <span>Add a backup email to your account as an additional security measure</span>
          </div>
          <button
            type="button"
            onClick={() => setShowBackupBanner(false)}
            className="text-[#1E429F]/70 hover:text-[#1E429F] p-1 rounded-md transition-colors cursor-pointer"
            title="Dismiss"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 3. Two-Factor Authentication Recommendation Banner */}
      {show2faBanner && !twoFactorEnabled && (
        <div className="bg-[#EBF5FF] border border-[#D0E7FE] rounded-xl px-4 py-3 flex items-center justify-between text-xs sm:text-sm text-[#1E429F] shadow-2xs">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[#1E429F] shrink-0" />
            <span>
              For added security and easier logins, we recommend setting up two-factor authentication.{' '}
              <a
                href="#2fa"
                className="font-semibold underline hover:text-blue-900 inline-flex items-center gap-0.5"
              >
                Learn more <ExternalLink size={12} className="inline ml-0.5" />
              </a>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShow2faBanner(false)}
            className="text-[#1E429F]/70 hover:text-[#1E429F] p-1 rounded-md transition-colors cursor-pointer"
            title="Dismiss"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 4. Photo Section */}
      <div className="flex items-center gap-4 pt-1">
        <div className="relative group w-14 h-14 rounded-xl bg-[#5C7CFA] overflow-hidden flex items-center justify-center shrink-0 border border-blue-200 shadow-2xs">
          {avatarUrl ? (
            <img
              src={avatarUrl.startsWith('http') ? avatarUrl : avatarUrl}
              alt={name || 'Profile photo'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#5C7CFA] flex items-center justify-center text-white">
              <User size={30} className="fill-white/85 text-transparent" />
            </div>
          )}

          {/* Upload overlay */}
          <label
            htmlFor="avatar-file-input"
            className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            {isUploadingAvatar ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <Camera size={14} />
                <span className="text-[9px] font-bold mt-0.5">Change</span>
              </>
            )}
          </label>
          <input
            id="avatar-file-input"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
            disabled={isUploadingAvatar}
          />
        </div>

        <div>
          <h4 className="text-sm font-bold text-neutral-900 leading-tight">Photo</h4>
          <p className="text-xs text-[#6B6B6B] mt-1">
            Please choose a photo that is at least 180×180 pixels in size.
          </p>
        </div>
      </div>

      {/* 5. Form Fields */}
      <div className="space-y-4 pt-1">
        {/* Name Row */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-800">Name</label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full max-w-md px-3.5 py-2 text-sm bg-white border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1493] focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={handleSaveName}
              disabled={isUpdatingProfile || name === initialName}
              className="shrink-0 px-4 py-2 text-xs font-semibold bg-neutral-200 hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Email Row */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-800">Email</label>
          <div className="flex items-center gap-3">
            <div className="relative w-full max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1493] focus:border-transparent pr-9 transition-all"
              />
              {!isVerified && (
                <span
                  title="Email is not verified"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none"
                >
                  <AlertTriangle size={15} />
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleSaveEmail}
              disabled={isUpdatingProfile || email === initialEmail}
              className="shrink-0 px-4 py-2 text-xs font-semibold bg-neutral-200 hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Backup Email Row */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-800">Backup Email</label>
          <div className="flex items-center gap-3">
            <input
              type="email"
              value={backupEmail}
              onChange={(e) => setBackupEmail(e.target.value)}
              placeholder=""
              className="w-full max-w-md px-3.5 py-2 text-sm bg-white border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1493] focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={handleSaveBackupEmail}
              disabled={isUpdatingProfile || backupEmail === initialBackupEmail}
              className="shrink-0 px-4 py-2 text-xs font-semibold bg-neutral-200 hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Password Row */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-800">Password</label>
          <div className="flex items-center gap-3">
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onFocus={() => setIsPasswordModalOpen(true)}
              className="w-full max-w-md px-3.5 py-2 text-sm bg-white border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1493] focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="shrink-0 px-4 py-2 text-xs font-semibold bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* 6. Two Factor Authentication */}
      <div id="2fa" className="pt-4 border-t border-[#E8E8E8] space-y-2">
        <div className="flex items-center justify-between max-w-xl">
          <h4 className="text-sm font-bold text-neutral-900">Two Factor Authentication</h4>
          <Toggle
            checked={twoFactorEnabled}
            onChange={handleToggle2FA}
            disabled={isUpdatingProfile}
          />
        </div>
        <p className="text-xs text-[#6B6B6B] max-w-xl leading-relaxed">
          Two factor authentication adds an extra layer of security for your Buffer account.
          Whenever you log in to your account, after entering your username and password,
          you'll be prompted to enter a verification code from your authenticator app.
        </p>
      </div>

      {/* Password Change Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setPasswordError('');
        }}
        title="Change Password"
      >
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {passwordError && (
            <div className="p-3 text-xs bg-red-50 text-red-600 border border-red-200 rounded-lg">
              {passwordError}
            </div>
          )}

          <Input
            label="Current Password"
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <Input
            label="New Password"
            type="password"
            placeholder="At least 8 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="flex justify-end gap-3 pt-3 border-t border-[#E8E8E8]">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPasswordModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isUpdatingPassword}>
              Update Password
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
