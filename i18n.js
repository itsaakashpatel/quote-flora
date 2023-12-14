// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';



i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          hello: 'Hello World!',
          goToSettings: 'Go to Settings',
          settings: 'Settings',
          switchToFrench: 'Switch to French',
          switchToEnglish: 'Switch to English',
          Home: 'Maison',
          settings: 'paramètres'
        },
      },
      fr: {
        translation: {
          hello: 'Bonjour le monde !',
          goToSettings: 'Aller aux paramètres',
          settings: 'Paramètres',
          darkMode: 'Mode sombre',
          enableNotifications:'activer les notifications',
          notificationTime: 'heure de notification',
          notificationFrequency: 'fréquence de notification',
          switchToFrench: 'Passer en français',
          switchToEnglish: 'Passer en anglais',
          Home: 'Maison',
          settings: 'paramètres'
        },
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
