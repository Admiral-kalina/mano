'use client'
import { FC, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { changeUserLanguage } from "@/features/userSlice/userSlice";

interface MiddleLayoutProps {
    children: ReactNode;
}


export const LanguageLayer: FC<MiddleLayoutProps> = ({children}) => {
    const dispatch = useDispatch();
    const {preferredLanguage} = useSelector((store: RootState) => store.user);

    useEffect(() => {
        const languageFromStorage = localStorage.getItem('preferredLanguage') || 'EN';
        if (languageFromStorage !== preferredLanguage) {
            dispatch(changeUserLanguage(languageFromStorage))
        }
    }, [dispatch, preferredLanguage])


    return (
      <>
        {children}
      </>
    );
};

