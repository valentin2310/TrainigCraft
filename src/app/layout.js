import { Inter } from "next/font/google";
import "./globals.css";
import 'remixicon/fonts/remixicon.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TrainigCraft",
  description: "Aplicación de entrenamiento, ideal para diseñar tus propias rutinas y seguir tu progreso.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
