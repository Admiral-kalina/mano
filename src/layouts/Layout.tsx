'use client'
import React, {FC, ReactNode} from 'react';

//libraries
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { MiddleLayout } from "@/layouts/MiddleLayout";
import { ToastContainer } from "react-toastify";

//styles
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
    children: ReactNode;
}

export const Layout:FC<LayoutProps> = ({children}) => {
    return (
        <Provider store={store}>
            <ToastContainer />
            <MiddleLayout>
                {children}
            </MiddleLayout>
        </Provider>
    );
};

