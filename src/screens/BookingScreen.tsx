import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { images } from '../assets/images';
import { convertToLocalTime } from '../utils/DateUtils';
import { fetchUserTickets } from '../service/requests/bookTicket';
import Shimmer from '../components/ui/ui/Shimmer';
import ErrorComponent from '../components/ui/ui/Error';

const filters = ['All', 'Upcoming', 'Past'];

const BookingsScreen = () => {
  const navigation = useNavigation<any>();
  const [filterValue, setFilterValue] = useState('All');
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetchUserTickets(filterValue)
      .then(ticketData => {
        setIsLoading(false);
        setError('');
        setTickets(ticketData);
      })
      .catch(error => {
        setIsLoading(false);
        if (error?.message === 'Please login again') {
          navigation.navigate('LoginScreen');
          return;
        }
        setError(error?.message);
      });
  }, [filterValue]);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      <View className="flex-row bg-surface px-4 py-4 items-center border-b border-border ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={16} color="#111827" />
        </TouchableOpacity>
        <View className="ml-4 flex-1">
          <Text className="text-base font-okra font-bold text-on-surface">
            My Bookings
          </Text>
          <Text className="text-sm font-okra text-on-surface/60">
            Past and upcoming trips
          </Text>
        </View>
      </View>

      <View className="flex-row px-4 py-4">
        {filters.map(item => {
          const isSelected = filterValue === item;
          return (
            <TouchableOpacity
              key={item}
              className={`px-4 py-2 rounded-full mr-2 ${
                isSelected ? 'bg-tertiary' : 'bg-neutral'
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
      ) : tickets?.length === 0 ? (
        <Text className="text-base font-okra text-on-surface/40 px-4">
          No bookings found
        </Text>
      ) : (
        <FlatList
          data={tickets}
          className="flex-1 bg-surface"
          keyExtractor={(item: any) => item?._id}
          renderItem={({ item }) => {
            return (
              <View
                key={item._id}
                className="bg-surface mb-4 p-4 rounded-2xl border border-border shadow-md mx-4"
              >
                <View className="flex-row items-center ">
                  <Image className="h-6 w-8 " source={images.logo} />
                  <View className="flex-1 ml-2">
                    <Text className="text-md font-okra font-bold text-on-surface">
                      {item?.bus?.company || 'Bus'}
                    </Text>
                    <Text className="text-base font-okra text-on-surface/40">
                      {item?.bus?.busType}
                    </Text>
                  </View>
                  <Text className="text-xs font-okra text-on-surface/60 ml-2">
                    {item?.status}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between mt-4">
                  <Text className="text-base font-okra font-semibold text-on-surface">
                    {item?.bus?.from}
                  </Text>
                  <View className="mx-3 h-px flex-1 bg-on-surface/20" />
                  <Text className="text-xs font-okra text-on-surface/60">
                    {item?.seatNumbers?.length || 0} seats
                  </Text>
                  <View className="mx-3 h-px flex-1 bg-on-surface/20" />
                  <Text className="text-base font-okra font-semibold text-on-surface">
                    {item?.bus?.to}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between mt-4">
                  <Text className="text-lg font-okra font-bold text-green-600">
                    Rs {item?.total_fare}
                  </Text>
                  <Text className="text-sm font-okra text-on-surface/60">
                    {item?.bus?.departureTime
                      ? convertToLocalTime(item.bus.departureTime)
                      : new Date(item?.date).toDateString()}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default BookingsScreen;
