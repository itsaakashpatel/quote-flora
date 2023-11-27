import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Switch, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../components/Header';

import ModalSelector from 'react-native-modal-selector';
import DateTimePicker from '@react-native-community/datetimepicker';
import Notification from '../utilities/Notification';

import {useTheme} from '../contexts/ThemeContext';
import {lightTheme, darkTheme} from '../themes/themes';

const SettingScreen = () => {
  const {currentTheme, toggleTheme} = useTheme();

  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [notificationTime, setNotificationTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [notificationFrequency, setNotificationFrequency] = useState('daily');

  const frequencyOptions = [
    {key: 'daily', label: 'Daily'},
    {key: 'weekly', label: 'Weekly'},
    {key: 'monthly', label: 'Monthly'},
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

  useEffect(() => {
    // You can schedule notifications based on the user's selected time and frequency here.
  }, [notificationEnabled, notificationTime, notificationFrequency]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: currentTheme.colors.background}]}>
      <Header text={'Settings'} />
      <View style={styles.settingItem}>
        <Text style={[styles.text, {color: currentTheme.colors.text}]}>Enable Notifications</Text>
        <Switch value={notificationEnabled} onValueChange={toggleNotification} />
      </View>
      <View style={styles.settingItem}>
        <Text style={[styles.text, {color: currentTheme.colors.text}]}>Notification Time</Text>
        <TouchableOpacity onPress={showTimePicker}>
          <Text style={[styles.text, {color: currentTheme.colors.text}]}>
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
        <Text style={[styles.text, {color: currentTheme.colors.text}]}>Notification Frequency</Text>
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
        <Text style={[styles.text, {color: currentTheme.colors.text}]}>Theme</Text>
        <Switch value={currentTheme === darkTheme} onValueChange={toggleTheme} />
      </View>
    </SafeAreaView>
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
});

export default SettingScreen;
