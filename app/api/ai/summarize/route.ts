import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  try {
    const { content, title } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const prompt = `
      Anda adalah asisten AI profesional untuk portal berita teknologi TeknoVarta.
      Tugas Anda adalah membuat ringkasan yang menarik, singkat, dan padat (maksimal 150 karakter) dari artikel berikut.
      Ringkasan ini akan ditampilkan di kartu artikel (card view) untuk menarik minat pembaca.
      Gunakan bahasa Indonesia yang santai tapi profesional.
      
      Judul Artikel: ${title}
      Konten Artikel: ${content.substring(0, 3000)}
      
      Hanya berikan teks ringkasannya saja, tanpa awalan atau penjelasan tambahan.
    `;

    const result = await model.generateContent(prompt);
    const summary = result.response.text().trim().replace(/^"|"$/g, ''); // Remove potential quotes

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("AI Summarization Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
