'use client';

import Swal from 'sweetalert2';

export default function NewsletterForm() {
  const handleSubscribe = () => {
    Swal.fire({
      title: 'Berhasil Berlangganan!',
      text: 'Terima kasih telah bergabung dengan TeknoVarta. Berita teknologi terbaru akan dikirim ke email Anda.',
      icon: 'success',
      confirmButtonColor: '#2563eb',
      confirmButtonText: 'Mantap!'
    });
  };

  return (
    <div className="space-y-3">
      <input 
        className="w-full px-4 py-3 rounded-lg text-slate-900 focus:outline-none" 
        placeholder="Alamat Email..."
      />
      <button 
        onClick={handleSubscribe}
        className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors"
      >
        Daftar Sekarang
      </button>
    </div>
  );
}
