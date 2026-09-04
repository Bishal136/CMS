import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface IRoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<IRoleGuardProps> = ({
  allowedRoles,
  children,
  fallback,
}) => {
  const { user, isAuthenticated, role } = useAuth();

  if (!isAuthenticated && !user) {
    return <Navigate to="/login" replace />;
  }

  const currentRole = role || 'user';

  if (!allowedRoles.includes(currentRole)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-[400px] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-[#E8E8E8] rounded-2xl p-8 text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600 mb-4">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mb-2">
            Administrator Access Required
          </h2>
          <p className="text-xs text-[#6B6B6B] leading-relaxed mb-6">
            This section is restricted to organization administrators (Admin role). You are
            currently signed in as <span className="font-semibold text-neutral-800">{user?.name}</span> with
            role <span className="inline-block uppercase font-bold text-xs px-2 py-0.5 bg-neutral-100 rounded text-neutral-700">{currentRole}</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/dashboard">
              <Button variant="primary" size="sm" className="w-full flex items-center gap-1.5">
                <ArrowLeft size={14} />
                <span>Back to Dashboard</span>
              </Button>
            </Link>
            <Link to="/settings/profile">
              <Button variant="outline" size="sm" className="w-full">
                My Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
