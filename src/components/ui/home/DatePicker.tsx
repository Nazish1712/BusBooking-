import { View, Text, Modal, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import React from 'react';
import {
  formatJourneyDate,
  formatCalendarDate,
} from '../../../utils/DateUtils';

const DatePicker = ({
  journeyDate,
  visible,
  onDateSelect,
  onDateClose,
}: {
  journeyDate: Date;
  visible: boolean;
  onDateSelect: (date: Date) => void;
  onDateClose: () => void;
}) => {
  console.log(journeyDate, 'joirney date');

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View className="flex-1 justify-end">
        <Pressable
          style={{
            flex: 2,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
          onPress={() => onDateClose()}
        />

        <View
          style={{ flex: 3 }}
          className="bg-surface  px-8 pt-8 pb-8 rounded-t-2xl overflow-hidden"
        >
          <Text className="text-xl font-okra font-bold text-on-surface mb-4">
            Select Journey City
          </Text>

          <Calendar
            current={formatCalendarDate(journeyDate)}
            minDate={formatCalendarDate(new Date())}
            enableSwipeMonths
            markedDates={{
              [formatCalendarDate(journeyDate)]: {
                selected: true,
                selectedColor: '#FC5431',
              },
            }}
            onDayPress={day => {
              onDateSelect(new Date(day.year, day.month - 1, day.day));
              onDateClose();
            }}
            theme={{
              selectedDayTextColor: '#ffffff',
              selectedDayBackgroundColor: '#FC5431',
              arrowColor: '#FC5431',
              todayTextColor: '#00000',
            }}
          />
          <View />
        </View>
      </View>
    </Modal>
  );
};

export default DatePicker;
