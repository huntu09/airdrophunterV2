# 🪂 airdrophunter

**airdrophunter** adalah platform modern berbasis web untuk membantu para pemburu airdrop menemukan, melacak, dan memaksimalkan peluang airdrop di dunia crypto & web3. Dibangun menggunakan Next.js, TypeScript, dan Tailwind CSS — cepat, responsif, dan mudah dikembangkan.

![Open Graph Image](https://airdrophunter-v2.vercel.app/og-image.png)

---

## ✨ Fitur Utama

- **Daftar Airdrop Terbaru:** Temukan airdrop- airdrop populer dan terbaru dari berbagai proyek blockchain.
- **Filter & Pencarian:** Cari dan filter airdrop sesuai kriteria (token, chain, tanggal, dsb).
- **Notifikasi & Reminder:** Dapatkan notifikasi tentang airdrop yang akan berakhir atau baru dimulai.
- **Bookmark Favorit:** Simpan airdrop yang menarik untuk dipantau lebih lanjut.
- **UI/UX Modern:** Tampilan elegan, dark mode, dan mobile-friendly.

---

## 🚀 Demo

Coba langsung di: [https://your-deployed-site.com](https://your-deployed-site.com)

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) *(opsional, untuk backend/database)*
- [Radix UI, Sonner, Zod, dll]*

---

## ⚙️ Instalasi & Jalankan Lokal

1. **Clone repo:**
   ```bash
   git clone https://github.com/huntu09/airdrophunterV2.git
   cd airdrophunterV2
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```
   *(atau `npm install` / `yarn install` sesuai package manager)*

3. **Jalankan development server:**
   ```bash
   pnpm dev
   ```
   Lalu buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📦 Build Production

```bash
pnpm build
```
Hasil build ada di folder `.next/`. Untuk preview:
```bash
pnpm start
```

---

## 📱 Build APK (Android)

Project ini bisa dijadikan APK Android via [PWA + TWA (Trusted Web Activity)](https://developer.chrome.com/docs/android/trusted-web-activity/quick-start/):

1. Deploy ke HTTPS (Vercel/Netlify/dsb).
2. Pastikan sudah PWA-ready (ada manifest & service worker).
3. Pakai Bubblewrap:
   ```bash
   npm install -g @bubblewrap/cli
   bubblewrap init --manifest=https://your-site.com/manifest.json
   bubblewrap build
   ```
4. Dapatkan file APK untuk Android.

---

## 🧑‍💻 Kontribusi

1. Fork repo ini
2. Buat branch fitur/bugfix baru (`git checkout -b fitur-anda`)
3. Commit & push perubahan Anda
4. Buka Pull Request

Lihat [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan lebih detail.

---

## 📄 Lisensi

MIT License © [huntu09](https://github.com/huntu09)

---

## 📞 Kontak & Dukungan

- Telegram: [@huntu09](https://t.me/airdropshunterV27)
- Twitter/X: [@huntu09](https://x.com/hunter_dr0ps?t=ZYp26v3ourWb2Lavry3OyA&s=09)
- Email: airdrophunter@gmail.com

---

## 🧑‍💻 Kontribusi

Saat ini, kontribusi terbuka **hanya untuk pemilik repository**.
Jika Anda ingin berkontribusi, silakan hubungi saya terlebih dahulu melalui email atau Telegram untuk mendapatkan izin.
Kontribusi tanpa izin tertulis tidak akan diterima.

> Made with ❤️ by hunters, for hunters.
