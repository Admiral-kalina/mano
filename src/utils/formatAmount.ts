export const formatAmount = (amount: number, language: string) => {
    const options = { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 };

    const localeMap = {
        LT: 'lt-LT',
    };

    const locale = localeMap[language] || 'en-US';

    return new Intl.NumberFormat(locale, options).format(amount);
}
