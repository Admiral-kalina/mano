import React, {FC} from 'react';

import { LanguagesSelector } from "@/components/Header/languagesSelector/languagesSelector";

import styles from './header.module.scss';


export const Header:FC = () => {
    return (
        <div className={styles.header}>
           <LanguagesSelector/>
        </div>
    );
};

