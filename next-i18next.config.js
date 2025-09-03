module.exports = {
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en', 'es'],
    localeDetection: false,
  },
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};