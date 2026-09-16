import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
