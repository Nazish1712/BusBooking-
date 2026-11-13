import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  StarIcon,
} from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import { convertToLocalTime, formatJourneyDate } from '../utils/DateUtils';
import { images } from '../assets/images';
import { fetchBuses } from '../service/requests/buses';
import Shimmer from '../components/ui/ui/Shimmer';
import ErrorComponent from '../components/ui/ui/Error';

const BusListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();

  const params = route?.params as any;
  const [filterValue, setFilterValue] = useState('All');
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { from, to, date } = params?.item || {};

  const filters = ['All', 'A/C', 'Non A/C', 'Sleeper', 'Seater'];

  useEffect(() => {
    setIsLoading(true);

    fetchBuses(from, to, date, filterValue)
      .then(busData => {
        setIsLoading(false);
        setError('');
        setBuses(busData);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error?.message);
      });
  }, [filterValue]);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      <View className="flex-row bg-surface px-4 py-4 items-center border-b border-border ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={16} color="#11827" />
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
              className={`px-4 py-2 rounded-full mr-2 ${
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

      {isLoading ? (
        <Shimmer />
      ) : error ? (
        <ErrorComponent error={error} />
      ) : buses?.length === 0 ? (
        <Text className="text-base font-okra text-on-surface/40">
          No buses found
        </Text>
      ) : (
        <FlatList
          data={buses}
          className="flex-1 bg-surface"
          keyExtractor={(item: any) => item?.busId}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                key={item.busId}
                className="bg-surface mb-4 p-4 rounded-2xl border border-border shadow-md"
                onPress={() =>
                  navigation.navigate('SeatSelectionScreen', {
                    item: { busId: item?.busId },
                  })
                }
              >
                <View className="flex-row items-center ">
                  <Image className="h-6 w-8 " source={images.logo} />
                  <View className="flex-1 ml-2">
                    <Text className="text-md font-okra font-bold text-on-surface">
                      {item.company}
                    </Text>
                    <Text className="text-base font-okra text-on-surface/40">
                      {item.busType}
                    </Text>
                  </View>
                  <StarIcon size={16} color={'#FDBB8A'} />
                  <Text className="text-xs font-okra text-on-surface/60 ml-2">
                    {item.rating} ({item.totalReviews})
                  </Text>
                </View>
                <View className="flex-row items-center justify-between mt-4">
                  <Text className="text-base font-okra font-semibold text-on-surface">
                    {convertToLocalTime(item.departureTime)}
                  </Text>
                  <View className="mx-3 h-px flex-1 bg-on-surface/20" />
                  <Text className="text-xs font-okra text-on-surface/60">
                    {item.duration}
                  </Text>
                  <View className="mx-3 h-px flex-1 bg-on-surface/20" />
                  <Text className="text-base font-okra font-semibold text-on-surface">
                    {convertToLocalTime(item.arrivalTime)}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between mt-4">
                  <Text className="text-lg font-okra font-bold text-green-600">
                    Rs {item.price}
                  </Text>
                  <Text className="text-sm font-okra text-on-surface/60">
                    {
                      item.seats.flat().filter((seat: any) => !seat.booked)
                        .length
                    }{' '}
                    seats
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default BusListScreen;
