import React, { useState, useEffect, FC } from 'react';

//libraries
import { Input } from 'antd';
import { FieldInputProps, FormikProps } from "formik";

//utils
import { formatAmount } from "@/utils/formatAmount";

interface AmountInputProps {
    field: FieldInputProps<any>;
    form: FormikProps<any>;
    language: string;
}


export const AmountInput:FC<AmountInputProps> = ({
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
            console.error("Error formatting value:", error);
            form.setFieldValue(field.name, 0);
            setDisplayValue('');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayValue(e.target.value);
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
