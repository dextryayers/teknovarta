import { Metadata } from 'next';
import VideoPortalClient from './VideoPortalClient';

export const metadata: Metadata = {
  title: 'Portal Video Teknologi - Jurnalisme Visual',
  description: 'Tonton ulasan teknologi, unboxing, dan panduan digital eksklusif di TeknoVarta Video Portal.',
};

export default function Page() {
  return <VideoPortalClient />;
}
