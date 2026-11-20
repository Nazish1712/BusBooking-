import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React from 'react';
import { XMarkIcon } from 'react-native-heroicons/solid';
import Svg, { Circle } from 'react-native-svg';
import { Button } from '../ui/ui/Button';

type TicketModalProps = {
  visible: boolean;
  onClose: () => void;
  bookingInfo: any;
};

const TicketModal = ({ visible, onClose, bookingInfo }: TicketModalProps) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/50">
        <TouchableOpacity
          onPress={onClose}
          className="bg-surface mb-4 p-2 rounded-full"
        >
          <XMarkIcon color={'#111827'} size={16} />
        </TouchableOpacity>

        <View className="bg-surface overflow-hidden rounded-lg w-[90%] p-4 relative">
          <Text className="text-center text-lg font-okra font-bold text-on-surface mb-2">
            Your Ticket
          </Text>

          <View className="absolute -left-4 top-[60%] -translate-y-1/2">
            <Svg height="40" width="28">
              <Circle cx="14" cy="20" r="14" fill={'#FDBB8A'} />
            </Svg>
          </View>
          <View className="absolute -right-4 top-[60%] -translate-y-1/2">
            <Svg height="40" width="28">
              <Circle cx="14" cy="20" r="14" fill={'#FDBB8A'} />
            </Svg>
          </View>

          <View className="bg-neutral p-4 rounded-md">
            <Text className="text-on-surface font-okra font-bold">
              {bookingInfo.from} → {bookingInfo.to}
            </Text>
            <Text className="text-on-surface/60 font-okra text-sm mt-1">
              {bookingInfo.departureTime} - {bookingInfo.arrivalTime},{' '}
              {bookingInfo.date}
            </Text>
          </View>

          <View className="mt-4">
            <Text className="text-on-surface font-okra font-bold">
              {bookingInfo.company}
            </Text>
            <Text className="text-on-surface/60 font-okra text-sm">
              {bookingInfo.busType}
            </Text>
          </View>

          <View className="mt-4">
            <Text className="text-on-surface font-okra font-bold">Seats</Text>
            <Text className="text-on-surface/60 font-okra text-sm">
              {bookingInfo?.seats?.toString()}
            </Text>
          </View>

          <Text
            className="my-8 text-center text-on-surface/70"
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          </Text>

          <View className="mt-4">
            <Text className="text-on-surface font-okra font-bold">
              Ticket #: {bookingInfo.ticketNumber}
            </Text>
            <Text className="text-on-surface font-okra font-bold mt-1">
              PNR #: {bookingInfo.pnr}
            </Text>
            <Text className="text-lg font-okra font-bold text-green-600 mt-2">
              ₹{bookingInfo.fare}
            </Text>
          </View>

          <Button label="My Bookings" className="mt-4" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default TicketModal;
