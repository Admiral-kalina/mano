import React, {FC} from 'react';

//components
import LanguagesSelector from "@/components/Header/languagesSelector/languagesSelector";

//styles
import styles from './header.module.scss';


export const Header:FC = () => {
    return (
        <div className={styles.header}>
           <LanguagesSelector/>
        </div>
    );
};

