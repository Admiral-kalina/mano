//components
import {Layout} from "@/layouts/Layout";

//styles
import "./globals.scss";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Layout>
            {children}
        </Layout>
      </body>
    </html>
  );
}
