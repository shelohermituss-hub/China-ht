import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "China-HT — Sourcing Haïti ↔ Chine",
  description: "Plateforme de sourcing entre Haïti et la Chine. Trouvez des fournisseurs vérifiés, gérez vos commandes et simplifiez vos importations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "Inter, sans-serif" }}>{children}</body>
    </html>
  );
}
