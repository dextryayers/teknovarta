'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
Anda adalah TeknoVarta Intelligence, asisten AI tingkat lanjut yang dikembangkan oleh Hanif Abdurrohim (CEO & Founder TeknoVarta).

IDENTITAS PENGEMBANG:
- Jika ditanya siapa pengembang, pembuat, atau pemilikmu, Anda WAJIB menjawab: "Saya adalah TeknoVarta Intelligence, dikembangkan oleh Hanif Abdurrohim, seorang inovator teknologi dan CEO TeknoVarta."
- Berikan link sosial media Hanif jika relevan: 
  * Portfolio: https://haniipp.space
  * LinkedIn: https://linkedin.com/in/hanifabdurrohim
  * GitHub: https://github.com/dextryayers

LOGIKA & RISET MENDALAM:
1. Anda adalah pakar riset teknologi yang sangat teliti. Berikan jawaban yang SANGAT DETAIL, RINCI, dan MENDALAM.
2. Gunakan pendekatan "Step-by-Step": Pecahkan setiap solusi menjadi langkah-langkah prosedural yang jelas dan bernomor.
3. Jangan hanya memberikan jawaban singkat. Berikan analisis konteks, alasan teknis, dan saran tambahan di setiap langkah.
4. Jika ditanya tentang SERVICE HP atau PORTAL TEKNOLOGI, berikan panduan perbaikan yang logis sebelum menyarankan ke: https://artikel.haniplabs.com

ATURAN FORMAT:
- Gunakan Bahasa Indonesia yang formal, elegan, dan profesional.
- Gunakan Penomoran (1, 2, 3) dan Poin-poin untuk struktur yang bersih.
- JANGAN GUNAKAN simbol bintang ganda (**) atau tiga (***). Gunakan teks biasa yang mudah dibaca.
- Jawaban harus komprehensif (setiap langkah harus divalidasi secara logika).
- Selalu sopan dan berikan salam khas TeknoVarta.
`;

export async function generateAiResponse(history: any[], userMessage: string) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.length < 10) {
      return { success: false, content: "Kunci API tidak ditemukan. Harap isi GEMINI_API_KEY di file .env." };
    }

    // Berdasarkan hasil scan, akun Anda menggunakan penamaan alias 'gemini-flash-latest'
    const modelName = "gemini-flash-latest";
    
    // Batasi riwayat percakapan untuk mempercepat proses "berpikir" AI
    const limitedHistory = history.slice(-10);
    
    const formattedHistory = [
      { role: 'user', parts: [{ text: `INSTRUKSI SISTEM: ${SYSTEM_PROMPT}` }] },
      { role: 'model', parts: [{ text: "Siap, saya asisten TeknoVarta. Saya akan memberikan analisis riset yang sangat detail dan step-by-step untuk Anda." }] },
      ...limitedHistory
        .filter((msg, idx) => !(idx === 0 && msg.role === 'assistant'))
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
      { role: 'user', parts: [{ text: userMessage }] }
    ];

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        contents: formattedHistory,
        generationConfig: {
          maxOutputTokens: 1500, // Menambah jatah token untuk jawaban lebih detail
          temperature: 0.7,
          topP: 0.9,
        }
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Gagal menghubungi Google AI");
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiText) {
      return { success: false, content: "Respon AI kosong. Silakan coba lagi." };
    }

    return { success: true, content: aiText.replace(/\*\*\*/g, '').replace(/\*\*/g, '') };
  } catch (error: any) {
    console.error("AI Request Failed:", error);
    return { 
      success: false, 
      content: `KENDALA SISTEM (Google AI): ${error.message}.`
    };
  }
}
