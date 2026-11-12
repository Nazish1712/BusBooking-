import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  StarIcon,
} from 'react-native-heroicons/solid';
import { useRoute } from '@react-navigation/native';
import { convertToLocalTime, formatJourneyDate } from '../utils/DateUtils';
import { images } from '../assets/images';
import { fetchBuses } from '../service/requests/buses';

const BusListScreen = () => {
  const [filterValue, setFilterValue] = useState('All');
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState(null);

  const route = useRoute();
  console.log(route);

  const params = route?.params as any;

  const { from, to, date } = params?.item || {};

  const filters = ['All', 'A/C', 'Non A/C', 'Sleeper', 'Seater'];

  useEffect(() => {
    fetchBuses(from, to, date, filterValue)
      .then(busData => {
        setBuses(busData);
      })
      .catch(error => {
        setError(error);
      });
  }, [filterValue]);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      <View className="flex-row bg-surface px-4 py-4 items-center border-b border-border ">
        <TouchableOpacity>
          <ArrowLeftIcon size={16} color={'#11827'} />
        </TouchableOpacity>
        <View className="ml-4 flex-1">
          <Text className="text-base font-okra font-bold text-on-surface">
            {from}-{to}
          </Text>
          <Text className="text-sm font-okra text-on-surface/60">{date}</Text>
        </View>
      </View>
      <View className="flex-row px-4 py-4">
        {filters.map(item => {
          const isSelected = filterValue === item;
          return (
            <TouchableOpacity
              key={item}
              className={`px-4 py-2 rounded-full mr-2 transition-all duration-200 ${
                isSelected ? 'bg-primary' : 'bg-neutral'
              }`}
              onPress={() => setFilterValue(item)}
            >
              <Text className={`${isSelected ? 'text-white' : 'text-black'}`}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View className="bg-surface">
        {buses.map((bus: any) => (
          <TouchableOpacity
            key={bus?.busId}
            className="bg-surface mb-4 p-4 rounded-2xl border border-border shadow-md"
          >
            <View className="flex-row items-center ">
              <Image className="h-6 w-8 " source={images.logo} />
              <View className="flex-1 ml-2">
                <Text className="text-md font-okra font-bold text-on-surface">
                  {bus.company}
                </Text>
                <Text className="text-base font-okra text-on-surface/40">
                  {bus.busType}
                </Text>
              </View>
              <StarIcon size={16} color={'#FDBB8A'} />
              <Text className="text-xs font-okra text-on-surface/60 ml-2">
                {bus.rating} ({bus.totalReviews})
              </Text>
            </View>
            <View className="flex-row items-center justify-between mt-4">
              <Text className="text-base font-okra font-semibold text-on-surface">
                {convertToLocalTime(bus.departureTime)}
              </Text>
              <View className="mx-3 h-px flex-1 bg-on-surface/20" />
              <Text className="text-xs font-okra text-on-surface/60">
                {bus.duration}
              </Text>
              <View className="mx-3 h-px flex-1 bg-on-surface/20" />
              <Text className="text-base font-okra font-semibold text-on-surface">
                {convertToLocalTime(bus.arrivalTime)}
              </Text>
            </View>
            <View className="flex-row items-center justify-between mt-4">
              <Text className="text-lg font-okra font-bold text-green-600">
                Rs {bus.price}
              </Text>
              <Text className="text-sm font-okra text-on-surface/60">
                {bus.seats.flat().filter((seat: any) => !seat.booked).length}{' '}
                seats
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default BusListScreen;
