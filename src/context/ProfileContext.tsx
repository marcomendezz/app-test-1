'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile } from '@/types';
import { updateProfile as updateDbProfile } from '@/app/actions/profile';

interface ProfileContextType {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children, initialProfile }: { children: ReactNode, initialProfile?: Profile | null }) {
  const [profile, setProfile] = useState<Profile>(initialProfile as Profile);

  useEffect(() => {
    if (initialProfile) setProfile(initialProfile);
  }, [initialProfile]);

  const updateProfile = async (updates: Partial<Profile>) => {
    // Optimistic update
    setProfile((prev) => ({ ...prev, ...updates, updated_at: new Date().toISOString() }));
    
    try {
      await updateDbProfile(updates);
    } catch (error) {
      console.error('Failed to update profile', error);
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
