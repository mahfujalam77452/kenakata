import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ProductProvider } from "@/context/ProductContext";
import "./globals.css";


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <ProductProvider>
        <Header/>
        {children}
        <Footer/>
        </ProductProvider>
        </body>
    </html>
  );
}
