import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: "EventMakers",
  description: "A event management platform for all your event needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <HeroUIProvider>{children}</HeroUIProvider>
      </body>
    </html>
  );
}
