export default function formatCurrency(amount, locale = 'en-CA', currency = 'CAD') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(amount);
}
