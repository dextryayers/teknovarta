import { Metadata } from 'next';
import VideoPortalClient from '../video/VideoPortalClient';

export const metadata: Metadata = {
  title: 'Vidio Teknologi Terbaru - TeknoVarta',
  description: 'Update vidio teknologi terbaru, review gadget, dan unboxing hanya di TeknoVarta.',
};

export default function Page() {
  return <VideoPortalClient />;
}
