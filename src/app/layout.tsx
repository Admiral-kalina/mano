'use client'
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { LanguageLayer } from "@/layers/LanguageLayer";
import { ToastContainer } from "react-toastify"

import {Header} from "@/components/Header/Header";

import 'react-toastify/dist/ReactToastify.css';
import "./globals.scss";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
            <ToastContainer />
            <LanguageLayer>
                <Header/>
                {children}
            </LanguageLayer>
        </Provider>
      </body>
    </html>
  );
}
