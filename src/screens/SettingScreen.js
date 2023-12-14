// SettingScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Switch, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import Header from '../components/Header';
import ModalSelector from 'react-native-modal-selector';
import DateTimePicker from '@react-native-community/datetimepicker';
import Notification from '../utilities/Notification';
import {useTheme} from '../contexts/ThemeContext';
import {lightTheme, darkTheme} from '../themes/themes';
import {useTranslation, I18nextProvider} from 'react-i18next';
import i18n from '../../i18n';

const SettingScreen = () => {
  const {currentTheme, toggleTheme, fontSelectHandler, currentFont} = useTheme();
  const {t} = useTranslation();
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [notificationTime, setNotificationTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [notificationFrequency, setNotificationFrequency] = useState('daily');
  const [selectedTextStyle, setSelectedTextStyle] = useState('default');

  const textStyleOptions = [
    {key: 'default', label: 'Default'},
    {key: 'nunito', label: 'Nunito'},
  ];

  const frequencyOptions = [
    {key: 'daily', label: t('daily')},
    {key: 'weekly', label: t('weekly')},
    {key: 'monthly', label: t('monthly')},
  ];

  const toggleNotification = (value) => {
    setNotificationEnabled(value);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (event, selectedTime) => {
    if (selectedTime !== undefined) {
      setNotificationTime(selectedTime);
    }
    hideTimePicker();
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const fontStyleHandler = (key) => {
    setSelectedTextStyle(key);
    if (key === 'nunito') {
      fontSelectHandler('nunito');
    }
  };

  useEffect(() => {}, [notificationEnabled, notificationTime, notificationFrequency]);

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaView style={[styles.container, {backgroundColor: currentTheme.colors.background}]}>
        <Header text={'settings'} />
        <View style={styles.languageButtons}>
          <Button onPress={() => changeLanguage('en')}>{t('english')}</Button>
          <Button onPress={() => changeLanguage('fr')}>{t('french')}</Button>
        </View>
        <View style={styles.settingItem}>
          <Text
            style={[
              styles.text,
              {color: currentTheme.colors.text, fontFamily: currentFont && currentFont},
            ]}
          >
            {t('enableNotifications')}
          </Text>
          <Switch value={notificationEnabled} onValueChange={toggleNotification} />
        </View>
        <View style={styles.settingItem}>
          <Text
            style={[
              styles.text,
              {color: currentTheme.colors.text, fontFamily: currentFont && currentFont},
            ]}
          >
            {t('notificationTime')}
          </Text>
          <TouchableOpacity onPress={showTimePicker}>
            <Text
              style={[
                styles.text,
                {color: currentTheme.colors.text, fontFamily: currentFont && currentFont},
              ]}
            >
              {notificationTime.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              style={[styles.text, {color: currentTheme.colors.text}]}
              value={notificationTime}
              mode="time"
              display="default"
              onChange={handleTimeConfirm}
            />
          )}
        </View>
        <View style={styles.settingItem}>
          <Text
            style={[
              styles.text,
              {color: currentTheme.colors.text, fontFamily: currentFont && currentFont},
            ]}
          >
            {t('notificationFrequency')}
          </Text>
          <ModalSelector
            data={frequencyOptions}
            initValue={notificationFrequency}
            onChange={(option) => setNotificationFrequency(option.key)}
          />
          <Notification
            notificationTime={notificationTime}
            notificationFrequency={notificationFrequency}
            isNotificationEnabled={notificationEnabled}
          />
        </View>
        <View style={styles.settingItem}>
          <Text
            style={[
              styles.text,
              {color: currentTheme.colors.text, fontFamily: currentFont && currentFont},
            ]}
          >
            Dark Mode
          </Text>
          <Switch value={currentTheme === darkTheme} onValueChange={toggleTheme} />
        </View>

        <View style={styles.settingItem}>
          <Text
            style={[
              styles.text,
              {color: currentTheme.colors.text, fontFamily: currentFont && currentFont},
            ]}
          >
            Text Style
          </Text>
          <ModalSelector
            data={textStyleOptions}
            initValue={selectedTextStyle}
            onChange={(option) => fontStyleHandler(option.key)}
          />
        </View>
      </SafeAreaView>
    </I18nextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FE',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  text: {
    color: 'black',
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});

export default SettingScreen;
