import React, { useState, useEffect, FC } from 'react';
import { FieldInputProps, FormikProps } from "formik";
import { Input } from 'antd';

import { formatAmount } from "@/utils/formatAmount";

interface AmountInputProps {
    field: FieldInputProps<any>;
    form: FormikProps<any>;
    language: string;
}


export const PriceInput:FC<AmountInputProps> = ({
 field,
 form,
 language,
 ...props
}) => {
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        if (field.value || field.value === 0) {
            setDisplayValue(formatAmount(field.value, language));
        }
    }, [field.value, language]);

    const handleFocus = () => {
        if (field.value) {
            const plainNumber = field.value.toString().replace(/[^\d.-]/g, '');
            setDisplayValue(plainNumber);
        }
    };

    const handleBlur = () => {
        try {
            const numericValue = parseFloat(displayValue);
            if (!isNaN(numericValue)) {
                form.setFieldValue(field.name, numericValue);
                setDisplayValue(formatAmount(numericValue, language));
            } else {
                form.setFieldValue(field.name, 0);
                setDisplayValue(formatAmount(0, language));
            }
        } catch (error) {
            form.setFieldValue(field.name, 0);
            setDisplayValue('');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const validPattern = /^-?\d*\.?\d*$/;

        if (validPattern.test(input)) {
            setDisplayValue(input);
        } else if (!input) {
            setDisplayValue('');
        }
    };

    return (
        <Input

            {...props}
            value={displayValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
        />
    );
};
