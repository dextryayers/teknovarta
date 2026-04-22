import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TeknoVarta - Portal Berita Teknologi Gen Z',
    short_name: 'TeknoVarta',
    description: 'Portal berita teknologi terkini, tips gadget, review laptop, dan database spesifikasi smartphone paling update.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a66c2',
    icons: [
      {
        src: '/images/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/og-image.jpg',
        sizes: '1200x630',
        type: 'image/jpeg',
      }
    ],
  };
}
