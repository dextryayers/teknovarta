import { PhoneSpec } from './phone-specs';

export interface AISummary {
  overview: string;
  pros: string[];
  cons: string[];
  recommendation: string;
}

export function generatePhoneAISummary(phone: PhoneSpec): AISummary {
  const { name, brand, specs } = phone;
  
  const chipset = specs.platform.chipset || '';
  const batteryStr = specs.battery.type || '';
  const batteryMahMatch = batteryStr.match(/(\d+)\s*mAh/);
  const batteryCap = batteryMahMatch ? parseInt(batteryMahMatch[1], 10) : 0;
  
  const display = specs.display.type || '';
  const isOLED = display.toLowerCase().includes('oled') || display.toLowerCase().includes('amoled');
  
  const camera = specs.mainCamera?.modules || '';
  const hasOIS = camera.toLowerCase().includes('ois');
  const hasPeriscope = camera.toLowerCase().includes('periscope');
  
  const charging = specs.battery?.charging || '';
  const hasWireless = charging.toLowerCase().includes('wireless');
  const chargingSpeedMatch = charging.match(/(\d+)W/);
  const chargingSpeed = chargingSpeedMatch ? parseInt(chargingSpeedMatch[1], 10) : 0;

  // Generate Overview
  let overview = `${name} merupakan lini smartphone dari keluarga ${brand} yang dirilis pada tahun ${phone.releasedYear}. `;
  
  const chipsetLower = chipset.toLowerCase();
  if (chipsetLower.includes('snapdragon 8') || chipsetLower.includes('apple a') || chipsetLower.includes('dimensity 9') || chipsetLower.includes('exynos 2')) {
    overview += `Perangkat ini diposisikan sebagai perangkat *flagship* (kelas atas) yang ditenagai oleh mesin komputasi tinggi ${chipset}. `;
  } else if (chipsetLower.includes('snapdragon 7') || chipsetLower.includes('exynos 14') || chipsetLower.includes('exynos 15') || chipsetLower.includes('exynos 13') || chipsetLower.includes('dimensity 7') || chipsetLower.includes('dimensity 8')) {
    overview += `Diotaki oleh prosesor *mid-range premium* ${chipset}, perangkat ini menawarkan keseimbangan yang apik antara performa gaming dan efisiensi harian. `;
  } else {
    overview += `Mengandalkan dapur pacu ${chipset}, ponsel ini lebih difokuskan untuk mengakomodasi kebutuhan dasar, komunikasi, dan efisiensi daya harian. `;
  }
  
  if (isOLED) {
    overview += `Pada sektor visual, layarnya sudah dibekali teknologi panel ${display.split(',')[0]} yang mampu menyajikan kontras warna tajam dengan warna hitam pekat yang memanjakan mata. `;
  }

  // Generate Pros
  const pros: string[] = [];
  if (isOLED) pros.push(`Layar tajam dan cerah berkat panel ${display.split(',')[0]}.`);
  if (batteryCap >= 5000) pros.push(`Kapasitas baterai besar (${batteryCap} mAh), jaminan awet untuk pemakaian seharian penuh.`);
  if (hasOIS) pros.push('Kamera utama telah didukung stabilisator optik (OIS) untuk meminimalisir guncangan saat rekam video.');
  if (hasPeriscope) pros.push('Kemampuan zoom jarak jauh yang sangat detail tanpa pecah berkat lensa periscope telephoto khusus.');
  if (chargingSpeed >= 45) pros.push(`Pengisian daya tergolong kilat dengan dukungan fast charging ${chargingSpeed}W.`);
  if (specs.body?.resistance && specs.body.resistance.includes('IP6')) pros.push('Bodinya tangguh menahan debu dan air dengan sertifikasi perlindungan IP67/IP68.');
  if (brand.toLowerCase() === 'samsung' && name.toLowerCase().includes('fold')) pros.push('Layar lipat revolusioner yang mendukung multitasking tingkat lanjut layaknya PC.');
  
  if (pros.length === 0) {
    pros.push('Desain solid dengan spesifikasi yang tergolong mencukupi di kelas harganya.');
  }

  // Generate Cons
  const cons: string[] = [];
  if (batteryCap > 0 && batteryCap < 4500 && !brand.toLowerCase().includes('apple') && !name.toLowerCase().includes('flip')) {
    cons.push(`Kapasitas baterai agak di bawah rata-rata tren saat ini (hanya ${batteryCap} mAh).`);
  }
  if (!charging.includes('W') || (chargingSpeed > 0 && chargingSpeed < 25)) {
    cons.push('Kecepatan pengisian daya standar, akan terasa sedikit lambat untuk standar pengguna agresif masa kini.');
  }
  if (specs.memory?.cardSlot?.toLowerCase().includes('no')) cons.push('Tidak dilengkapi slot memori eksternal (MicroSD).');
  if (specs.sound?.jack35mm?.toLowerCase().includes('no')) cons.push('Absennya port audio jack 3.5mm untuk menggunakan earphone kabel tradisional.');
  if (!hasWireless && (chipsetLower.includes('snapdragon 8') || chipsetLower.includes('apple a'))) {
    cons.push('Absennya dukungan wireless charging (pengisian nirkabel) untuk ponsel sekelas ini.');
  }
  if (cons.length === 0) {
    cons.push('Belum ditemukan kelemahan krusial yang bersifat sangat fatal.');
  }

  // Generate Recommendation
  let recommendation = '';
  if (chipsetLower.includes('snapdragon 8') || chipsetLower.includes('apple a') || chipsetLower.includes('exynos 2400')) {
    recommendation = `HP ini sangat direkomendasikan bagi tipe pengguna *power-user*, *gamer* kelas berat (seperti pemain Genshin Impact rata kanan), atau *content creator* profesional yang membutuhkan tenaga komputasi tanpa batas.`;
  } else if (batteryCap >= 6000) {
    recommendation = `Merupakan pilihan paling cerdas dan rasional bagi para pekerja lapangan, *driver online*, atau pebisnis yang anti ribet membawa powerbank berkat kapasitas monster baterainya.`;
  } else if (hasOIS) {
    recommendation = `Smartphone yang sangat tepat dibeli oleh pengguna kasual yang punya hobi fotografi media sosial (Instagram/TikTok), namun belum memiliki dana ekstrem untuk membeli seri flagship termahal.`;
  } else {
    recommendation = `Sangat pas dibeli untuk pelajar, orang tua, atau penggunaan ringan sehari-hari (WhatsApp, YouTube, media sosial ringan) maupun untuk dijadikan HP cadangan (*secondary phone*).`;
  }

  return { overview, pros, cons, recommendation };
}
