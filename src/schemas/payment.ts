import * as Yup from "yup";

type ValidateIBANType = (iban: string) => Promise<boolean | string>;

export const paymentSchema = (validateIBAN:ValidateIBANType, maxAmount:number) => {
    return Yup.object().shape({
        amount: Yup.number()
            .min(0.01, 'Amount must be at least 0.01')
            .max(maxAmount, `Amount cannot be more than the account balance (${maxAmount})`)
            .required('Amount is required'),
        payeeAccount: Yup.string().required('Payee account is required').test(
            'is-iban-valid',
            'IBAN is not valid',
            async (value) => {
                try {
                    const isValid = await validateIBAN(value || '');
                    return isValid === true;
                } catch (error) {
                    return false;
                }
            }
        ),
        purpose: Yup.string().min(3, 'Purpose must be at least 3 characters').max(135, 'Purpose can be up to 135 characters').required('Purpose is required'),
        payerAccount: Yup.object().shape({
            iban: Yup.string().required('Payer account is required'),
            balance: Yup.number()
                .moreThan(0, 'Payer account balance must be greater than 0')
                .required('Payer account balance is required'),
            id: Yup.string(),
        }).required('Payer account is required'),
        recipient: Yup.string().max(70, 'Recipient can be up to 70 characters').required('Recipient is required'),
    });
};

