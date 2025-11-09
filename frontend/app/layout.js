import { Inter, Nunito, Lato } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
});

export const metadata = {
  title: "EduSafe - Sistem Komunikasi Sekolah",
  description: "Platform komunikasi antara Admin, Guru, dan Orang Tua",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${nunito.variable} ${lato.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

