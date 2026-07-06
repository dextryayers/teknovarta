import { Metadata } from 'next';
import { TIPS_DATA } from '@/lib/tips-data';
import TipDetailClient from './TipDetailClient';
import JsonLd from '@/components/JsonLd';

export async function generateStaticParams() {
  return TIPS_DATA.map((tip) => ({
    category: tip.categorySlug,
    slug: tip.slug,
  }));
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { category, slug } = await params;
  const tip = TIPS_DATA.find((t) => t.slug === slug && t.categorySlug === category);

  if (!tip) {
    return {
      title: 'Tips Tidak Ditemukan',
    };
  }

  const title = `${tip.title} - Panduan TeknoVarta`;
  const description = `${tip.description}. Pelajari langkah-langkah teknis mendalam dan tips ahli dari TeknoVarta Hacks.`;

  return {
    title,
    description,
    openGraph: {
      title: `${tip.title} | Hacks & Tips TeknoVarta`,
      description,
      url: `https://artikel.haniplabs.com/tips/${tip.categorySlug}/${tip.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/tips/${tip.categorySlug}/${tip.slug}`,
    },
  };
}

export default async function Page({ params }: { params: any }) {
  const { category, slug } = await params;
  const tip = TIPS_DATA.find((t) => t.slug === slug && t.categorySlug === category);

  if (!tip) return <TipDetailClient category={category} slug={slug} />;

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
        "name": "Teknovarta Hacks",
        "item": "https://artikel.haniplabs.com/tips"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tip.category,
        "item": `https://artikel.haniplabs.com/tips?category=${tip.categorySlug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": tip.title,
        "item": `https://artikel.haniplabs.com/tips/${tip.categorySlug}/${tip.slug}`
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <TipDetailClient category={category} slug={slug} />
    </>
  );
}
