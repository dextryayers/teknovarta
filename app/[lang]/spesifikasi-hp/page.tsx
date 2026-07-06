import type { Metadata } from 'next';
import PhoneSpecsClient from './PhoneSpecsClient';

export const metadata: Metadata = {
  title: 'Informasi Spesifikasi HP',
  description: 'Daftar lengkap spesifikasi smartphone terbaru 2025-2026. Bandingkan fitur, kamera, baterai, dan harga secara detail.',
};

export default function PhoneSpecsPage() {
  return <PhoneSpecsClient />;
}
