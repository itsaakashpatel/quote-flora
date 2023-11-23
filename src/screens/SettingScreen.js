import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Switch, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../components/Header';

import ModalSelector from 'react-native-modal-selector';
import DateTimePicker from '@react-native-community/datetimepicker';
import Notification from '../utilities/Notification';
const SettingScreen = () => {
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
    <SafeAreaView style={styles.container}>
      <Header text={'Settings'} />
      <View style={styles.settingItem}>
        <Text>Enable Notifications</Text>
        <Switch value={notificationEnabled} onValueChange={toggleNotification} />
      </View>
      <View style={styles.settingItem}>
        <Text>Notification Time</Text>
        <TouchableOpacity onPress={showTimePicker}>
          <Text>{notificationTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={notificationTime}
            mode="time"
            display="default"
            onChange={handleTimeConfirm}
          />
        )}
      </View>
      <View style={styles.settingItem}>
        <Text>Notification Frequency</Text>
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
});

export default SettingScreen;
