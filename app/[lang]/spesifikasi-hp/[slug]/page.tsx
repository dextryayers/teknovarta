import { Metadata } from 'next';
import { PHONE_SPECS } from '@/lib/phone-specs';
import PhoneDetailClient from './PhoneDetailClient';
import JsonLd from '@/components/JsonLd';

export async function generateStaticParams() {
  return PHONE_SPECS.map((phone) => ({
    slug: phone.slug,
  }));
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { slug } = await params;
  const phone = PHONE_SPECS.find((p) => p.slug === slug);

  if (!phone) {
    return {
      title: 'HP Tidak Ditemukan',
    };
  }

  const title = `Spesifikasi Lengkap ${phone.name} - Harga & Fitur Terbaru 2026`;
  const description = `Cek rincian teknis mendalam ${phone.name} meliputi chipset ${phone.specs.platform.chipset}, kamera ${phone.specs.mainCamera.modules.split(',')[0]}, baterai ${phone.specs.battery.type}, dan layar ${phone.specs.display.size}. Berita teknologi akurat di TeknoVarta.`;

  return {
    title,
    description,
    openGraph: {
      title: `${phone.name} Specifications | TeknoVarta`,
      description,
      images: [{ url: phone.image }],
      url: `https://artikel.haniplabs.com/spesifikasi-hp/${phone.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [phone.image],
    },
    alternates: {
      canonical: `/spesifikasi-hp/${phone.slug}`,
    },
  };
}

export default async function Page({ params }: { params: any }) {
  const { slug } = await params;
  const phone = PHONE_SPECS.find((p) => p.slug === slug);

  if (!phone) return <PhoneDetailClient slug={slug} />;

  const title = `Spesifikasi Lengkap ${phone.name} - Harga & Fitur Terbaru 2026`;
  const description = `Cek rincian teknis mendalam ${phone.name} meliputi chipset ${phone.specs.platform.chipset}, kamera ${phone.specs.mainCamera.modules.split(',')[0]}, baterai ${phone.specs.battery.type}, dan layar ${phone.specs.display.size}. Berita teknologi akurat di TeknoVarta.`;

  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": phone.name,
    "image": phone.image,
    "description": description,
    "brand": {
      "@type": "Brand",
      "name": phone.brand
    },
    "model": phone.name,
    "category": "Smartphone"
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://artikel.haniplabs.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Spesifikasi HP",
        "item": "https://artikel.haniplabs.com/spesifikasi-hp"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": phone.name,
        "item": `https://artikel.haniplabs.com/spesifikasi-hp/${phone.slug}`
      }
    ]
  };

  return (
    <>
      <JsonLd data={productData} />
      <JsonLd data={breadcrumbData} />
      <PhoneDetailClient slug={slug} />
    </>
  );
}
