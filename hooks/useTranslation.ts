import { useParams } from 'next/navigation';
import en from '@/dictionaries/en.json';
import id from '@/dictionaries/id.json';

export type Translation = typeof id;

export const useTranslation = () => {
  const params = useParams();
  const lang = (params?.lang as string) || 'id';
  
  const t: Translation = lang === 'en' ? (en as Translation) : id;
  return { t, lang };
};
