'use client'
import { FC, ReactNode, useEffect } from "react";

//libraries
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

//components
import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";
import { changeUserLanguage } from "@/features/userSlice/userSlice";

interface MiddleLayoutProps {
    children: ReactNode;
}


export const MiddleLayout: FC<MiddleLayoutProps> = ({children}) => {
    const dispatch = useDispatch();
    const {preferredLanguage} = useSelector((store: RootState) => store.user);

    useEffect(() => {
        const languageFromStorage = localStorage.getItem('preferredLanguage') || 'EN';
        if (languageFromStorage !== preferredLanguage) {
            dispatch(changeUserLanguage(languageFromStorage))
        }
    }, [dispatch, preferredLanguage])


    return (
        <Container>
            <Header/>
            {children}
        </Container>
    );
};

