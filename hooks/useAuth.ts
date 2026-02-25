'use client';

import { useAuthStore } from '@/stores/authStore';
import { FIXED_USERS } from '@/lib/auth/users';
import { useEffect } from 'react';

export function useAuth() {
  const { user, isLoading, setUser, setLoading, logout } = useAuthStore();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === 'true' && !user) {
      // Auto-login as admin in mock mode
      const adminUser = FIXED_USERS[0];
      setUser({
        id: 'mock-user-001',
        email: adminUser.email,
        role: adminUser.role,
        employeeId: 'mock-emp-001',
        employeeCode: adminUser.employeeCode,
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
      });
    } else {
      setLoading(false);
    }
  }, [user, setUser, setLoading]);

  return { user, isLoading, logout };
}
