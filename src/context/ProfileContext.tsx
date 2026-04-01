'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Profile } from '@/types';
import { updateProfile as updateDbProfile } from '@/app/actions/profile';

interface ProfileContextType {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children, initialProfile }: { children: ReactNode, initialProfile?: Profile | null }) {
  // Use initialProfile's id as the key for state reset when server data changes
  const [profile, setProfile] = useState<Profile>(initialProfile as Profile);
  const [prevInitialId, setPrevInitialId] = useState(initialProfile?.id);

  // Sync from server without useEffect (React recommended pattern)
  if (initialProfile && initialProfile.id !== prevInitialId) {
    setProfile(initialProfile);
    setPrevInitialId(initialProfile.id);
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    const snapshot = { ...profile };
    setProfile((prev) => ({ ...prev, ...updates, updated_at: new Date().toISOString() }));

    try {
      await updateDbProfile(updates);
    } catch {
      setProfile(snapshot);
      if (process.env.NODE_ENV === 'development') console.error('Failed to update profile — rolled back');
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
