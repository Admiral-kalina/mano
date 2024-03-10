import React, {FC} from 'react';

//styles
import styles from './container.module.scss';

interface ContainerProps {
    children: React.ReactNode;
}


export const Container: FC<ContainerProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};


