import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Roboto as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from './components/ThemeProvider';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
})

export const metadata = {
  title: 'AttendEase',
  description: 'Your friendly attendance tracking app.',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
