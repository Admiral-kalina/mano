import React, { FC } from 'react';

// components
import { PaymentForm } from "@/components/Form/PaymentForm/PaymentForm";

// styles
import styles from './home.module.scss';


export const Home:FC = () => {
    return (
        <div className={styles.home}>
           <PaymentForm/>
        </div>
    );
};