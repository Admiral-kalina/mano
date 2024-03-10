import React, { useState, useEffect, FC } from 'react';
import { Input } from 'antd';
import { FieldInputProps, FormikProps } from "formik";

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
            form.setFieldValue(field.name, 0);
            setDisplayValue('');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        // This pattern allows numbers, a single dot for decimal, and minus sign for negative numbers
        const validPattern = /^-?\d*\.?\d*$/;

        // Check if the current input is valid
        if (validPattern.test(input)) {
            setDisplayValue(input);
        } else if (!input) {
            // Allows clearing the input
            setDisplayValue('');
        }
        // If the input is not valid, don't update the displayValue, effectively ignoring the input
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
