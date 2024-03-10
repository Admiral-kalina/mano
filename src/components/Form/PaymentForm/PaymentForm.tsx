"use client"
import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from '@/store/store';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Input, Button, Select} from 'antd';

const {Option} = Select;
import clsx from "clsx";

import {AmountInput} from "@/components/Inputs/AmountInput/AmountInput";

import {formatAmount} from "@/utils/formatAmount";
import {paymentSchema} from "@/schemas/payment";

import {payerAccounts} from "@/mockData/payerAccounts";

import styles from './paymentForm.module.scss';
import {toast} from "react-toastify";

type SetFieldValue = (field: string, value: any, shouldValidate?: boolean) => void;

export const PaymentForm = () => {
    const [selectedAccountBalance, setSelectedAccountBalance] = useState(payerAccounts.length > 0 ? payerAccounts[0].balance : 0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const initialValues = {
        payerAccount: payerAccounts.length > 0 ? payerAccounts[0] : {iban: '', id: '', balance: 0},
        payeeAccount: '',
        recipient: '',
        amount: null,
        purpose: '',
    }

    const isBalanceInsufficient = selectedAccountBalance <= 0;
    const {preferredLanguage} = useSelector((store: RootState) => store.user);

    const handleSubmit = () => {
        toast.success("Payment is successful", {
            position: "top-right",
        });
        setIsSubmitted(true);
    };

    const handleAccountChange = (value: string, setFieldValue: SetFieldValue, setTouched, setErrors) => {
        const selectedAccount = payerAccounts.find(account => account.iban === value);
        if (selectedAccount) {
            setFieldValue('payerAccount', selectedAccount, false);
            setSelectedAccountBalance(selectedAccount.balance);
            setTouched({});
            setErrors({});
        }
    }


    return (
        <div className={clsx(
            styles.formContainer,
            {[styles.formContainer_disabled]: isSubmitted}
        )}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={paymentSchema(selectedAccountBalance)}
                onSubmit={handleSubmit}
            >
                {({isSubmitting, isValid, touched, setFieldValue,setTouched,setErrors}) => (
                    <Form>
                        <div className={styles.fieldWrapper}>
                            <label className={styles.label} htmlFor="payerAccount.iban">Payer Account</label>
                            <Field
                                className={styles.select}
                                name="payerAccount.iban" as={Select}
                                placeholder="Select Payer Account"
                                onChange={(value: string) => {
                                    handleAccountChange(value, setFieldValue, setTouched, setErrors)

                                }}
                            >
                                {payerAccounts.map(account => (
                                    <Option
                                        key={account.id}
                                        value={account.iban}
                                    >
                                        {account.iban} - Balance: {formatAmount(account.balance, preferredLanguage)}
                                    </Option>
                                ))}
                            </Field>
                            <ErrorMessage className={styles.errorMsg} name="payerAccount.iban" component="div"/>
                            {isBalanceInsufficient ?
                                <p className={styles.errorMsg}>You have debts on your account</p>
                                : null
                            }
                        </div>

                        <div className={styles.fieldWrapper}>
                            <label className={styles.label} htmlFor="payeeAccount">Payee Account</label>
                            <Field className={styles.field} name="payeeAccount" as={Input} placeholder="Payee Account"/>
                            <ErrorMessage className={styles.errorMsg} name="payeeAccount" component="div"/>
                        </div>

                        <div className={styles.fieldWrapper}>
                            <label className={styles.label} htmlFor="amount">Amount</label>
                            <Field
                                name="amount"
                                component={AmountInput}
                                language={preferredLanguage}
                                disabled={isBalanceInsufficient}
                                className={styles.field}
                                placeholder="Amount"
                            />
                            <ErrorMessage className={styles.errorMsg} name="amount" component="div"/>
                        </div>

                        <div className={styles.fieldWrapper}>
                            <label className={styles.label} htmlFor="recipient">Recipient</label>
                            <Field className={styles.field} name="recipient" as={Input} placeholder="Recipient"/>
                            <ErrorMessage className={styles.errorMsg} name="recipient" component="div"/>
                        </div>

                        <div className={styles.fieldWrapper}>
                            <label className={styles.label} htmlFor="purpose">Purpose</label>
                            <Field className={styles.field} name="purpose" as={Input} placeholder="Purpose"/>
                            <ErrorMessage className={styles.errorMsg} name="purpose" component="div"/>
                        </div>

                        <div className={styles.buttonWrapper}>
                            <Button
                                className={clsx(styles.submitBtn, {
                                    [styles.submitBtnError]: !isValid && Object.keys(touched).length > 0,
                                    [styles.disabled]: isBalanceInsufficient
                                })}
                                type="primary"
                                htmlType="submit"
                                disabled={isSubmitting || isBalanceInsufficient}
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

