export const formatAmount = (amount:number, language:string) => {
    const options = { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 };

    switch(language) {
        case 'LT':
            return new Intl.NumberFormat('lt-LT', options).format(amount);
        case 'EN':
        default:
            return new Intl.NumberFormat('en-US', options).format(amount);
    }
}
