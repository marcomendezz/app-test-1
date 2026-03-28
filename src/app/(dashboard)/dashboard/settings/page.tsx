'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileInput } from '@/lib/validations';
import { useProfile } from '@/context/ProfileContext';
import { useToast } from '@/context/ToastContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import Cropper from 'react-easy-crop';

// Helper to convert cropped area to base64
const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<string> => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => { image.onload = resolve; });
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.drawImage(
    image,
    pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
    0, 0, pixelCrop.width, pixelCrop.height
  );
  return canvas.toDataURL('image/jpeg');
};

export default function SettingsPage() {
  const { profile, updateProfile } = useProfile();
  const { addToast } = useToast();
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Crop States
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile.full_name,
      email: profile.email,
      company: profile.company || '',
      notify_email: profile.notify_email,
      notify_browser: profile.notify_browser,
    }
  });

  const onSubmit = (data: ProfileInput) => {
    updateProfile(data);
    addToast({
      title: 'Profile updated',
      description: 'Your changes have been saved successfully.',
      type: 'success',
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      updateProfile({ avatar_url: croppedImage });
      addToast({ title: 'Avatar updated', type: 'success' });
      setImageSrc(null); // Close modal
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#37352F]">{t('settings.title')}</h1>
        <p className="text-sm text-[#91918E] mt-1">{t('settings.subtitle')}</p>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">{t('settings.profile_setup')}</h2>
          <p className="text-sm text-gray-500 mt-1">{t('settings.profile_desc')}</p>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center space-x-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={profile.avatar_url || 'https://i.pravatar.cc/150'} alt="Avatar" className="h-16 w-16 rounded-full border border-gray-200 object-cover" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  {t('settings.change_avatar')}
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="full_name" className="text-sm font-medium text-gray-700">{t('settings.full_name')}</label>
                  <Input id="full_name" {...register('full_name')} />
                  {errors.full_name && <p className="text-xs text-red-600">{errors.full_name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">{t('settings.email')}</label>
                  <Input id="email" type="email" {...register('email')} />
                  {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="company" className="text-sm font-medium text-gray-700">{t('settings.company')}</label>
                  <Input id="company" {...register('company')} />
                </div>
              </div>

              <hr className="my-6 border-gray-100" />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">{t('settings.notifications')}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{t('settings.notify_email')}</p>
                    <p className="text-xs text-gray-500">{t('settings.notify_email_desc')}</p>
                  </div>
                  <input type="checkbox" {...register('notify_email')} className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{t('settings.notify_browser')}</p>
                    <p className="text-xs text-gray-500">{t('settings.notify_browser_desc')}</p>
                  </div>
                  <input type="checkbox" {...register('notify_browser')} className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900" />
                </div>
              </div>
            </CardContent>
            
            {isDirty && (
              <CardFooter className="flex justify-end border-t border-gray-100 pt-6 animate-in fade-in slide-in-from-bottom-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : t('settings.save_changes')}
                </Button>
              </CardFooter>
            )}
          </form>
        </Card>

        {/* Appearance & Language Card */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">{t('settings.appearance')} & {t('settings.language')}</h2>
          <p className="text-sm text-gray-500 mt-1">Customize the dashboard to your preferences.</p>
        </div>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">{t('settings.theme')}</p>
                <p className="text-xs text-gray-500">Toggle between light and dark mode.</p>
              </div>
              <Button variant="outline" size="sm" onClick={toggleTheme} type="button">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
            <hr className="my-4 border-gray-100" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">{t('settings.language')}</p>
                <p className="text-xs text-gray-500">Toggle between English and Spanish.</p>
              </div>
              <Button variant="outline" size="sm" onClick={toggleLanguage} type="button">
                {language === 'en' ? 'Español' : 'English'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal isOpen={!!imageSrc} onClose={() => setImageSrc(null)} title="Crop Avatar">
        {imageSrc && (
          <div className="space-y-4">
            <div className="relative h-64 w-full bg-gray-900 rounded-lg overflow-hidden">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="w-1/2">
                <label className="text-xs text-gray-500 mb-1 block">Zoom</label>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-gray-900"
                />
              </div>
              <div className="space-x-2">
                <Button variant="ghost" onClick={() => setImageSrc(null)}>Cancel</Button>
                <Button onClick={handleSaveCrop}>Save Avatar</Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
