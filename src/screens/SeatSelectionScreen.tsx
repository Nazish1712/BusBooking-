import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import { images } from '../assets/images';
import { fetchBusDetails } from '../service/requests/seatSelection';
import { convertToLocalTime } from '../utils/DateUtils';
import { Button } from '../components/ui/ui/Button';
import ErrorComponent from '../components/ui/ui/Error';
import Shimmer from '../components/ui/ui/Shimmer';
import TicketModal from '../components/bookings/TicketModal';
import { bookTicket } from '../service/requests/bookTicket';

const SeatSelectionScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const busId = route?.params?.item?.busId;

  const [busAndSeatData, setBusAndSeatData] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [bookedTicket, setBookedTicket] = useState<any>(null);
  const [ticketVisible, setTicketVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchBusDetails(busId)
      .then(response => {
        setLoading(false);
        setBusAndSeatData(response);
      })
      .catch(error => {
        setLoading(false);
        setError(error?.message);
      });
  }, [busId]);

  const handlePressSeat = (seatId: any) => {
    const isAlreadySelectedSeat = selectedSeats.includes(seatId);
    if (isAlreadySelectedSeat) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handlePayNow = () => {
    setPaying(true);
    bookTicket({
      busId,
      date: new Date(busAndSeatData.departureTime).toISOString(),
      seatNumbers: selectedSeats,
    })
      .then(ticket => {
        setPaying(false);
        setBookedTicket(ticket);
        setTicketVisible(true);
      })
      .catch(error => {
        setPaying(false);
        if (error?.message === 'Please login again') {
          navigation.navigate('LoginScreen');
          return;
        }
        setError(error?.message);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      {loading ? (
        <Shimmer />
      ) : error ? (
        <ErrorComponent error={error} />
      ) : !busAndSeatData ? (
        <Text className="text-base font-okra text-on-surface/40">
          No bus details found.
        </Text>
      ) : (
        <>
          <View className="flex-row bg-surface px-4 py-4 items-center border-b border-border ">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeftIcon size={16} color="#111827" />
            </TouchableOpacity>
            <View className="ml-4 flex-1">
              <Text className="text-base font-okra font-bold text-on-surface">
                Seat Selection
              </Text>
              <Text className="text-sm font-okra text-on-surface/60">
                {busAndSeatData.from} - {busAndSeatData.to} (
                {convertToLocalTime(busAndSeatData.departureTime)})
              </Text>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 bg-surface"
            contentContainerClassName="px-4 pb-6"
          >
            <View className="flex-row items-center mt-4">
              <Image source={images.logo} className="h-6 w-8" />
              <View className="ml-2 flex-1">
                <Text className="text-base font-okra font-bold text-on-surface">
                  {busAndSeatData.company}
                </Text>
                <Text className="text-xs font-okra text-on-surface/60">
                  {busAndSeatData.busType}
                </Text>
              </View>
              <StarIcon size={16} color={'#FDBB8A'} />
              <Text className="text-xs font-okra text-on-surface/60 ml-2">
                {busAndSeatData.rating} ({busAndSeatData.totalReviews})
              </Text>
            </View>
            <View className="mt-4">
              <View className="flex-row items-center justify-between px-2">
                {[
                  {
                    label: 'Selected',
                    box: 'bg-green-600',
                  },
                  {
                    label: 'Available',
                    box: 'border-2 border-green-600 bg-surface',
                  },
                  {
                    label: 'Booked',
                    box: 'border-2 border-onSurface/20 bg-neutral',
                  },
                ].map(item => (
                  <View key={item.label} className="flex-row items-center">
                    <View className={`h-4 w-4 rounded mr-2 ${item.box}`} />
                    <Text className="font-okra text-sm text-on-surface">
                      {item.label}
                    </Text>
                  </View>
                ))}
              </View>
              <View className="mt-4 bg-white p-4 rounded-2xl">
                <Image
                  source={images.wheel}
                  className="h-8 w-8 self-end mb-4"
                />
                {busAndSeatData?.seats?.map((rows: any, index: number) => {
                  return (
                    <View key={index} className="flex-row justify-between mb-3">
                      {rows?.map((seat: any) => {
                        if (seat.type === 'path') {
                          return (
                            <View key={seat.seat_id} className="h-10 w-10" />
                          );
                        }
                        const isSelected = selectedSeats.includes(seat.seat_id);
                        const seatImage = seat.booked
                          ? images.bookedSeat
                          : isSelected
                          ? images.selectedSeat
                          : images.availableSeat;
                        return (
                          <TouchableOpacity
                            key={seat.seat_id}
                            disabled={seat.booked}
                            onPress={() => handlePressSeat(seat.seat_id)}
                          >
                            <Image
                              source={seatImage}
                              className="w-10 h-10"
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  );
                })}
              </View>

              <View className="flex-row items-center justify-between mt-6 border-t border-border pt-4">
                <View className="flex-1 mr-4">
                  <Text className="text-base font-okra font-bold text-on-surface">
                    Selected Seats
                  </Text>
                  <Text className="text-sm font-okra text-on-surface/60 mt-1">
                    {selectedSeats.join(' , ')}
                  </Text>
                </View>
                <Text className="text-sm font-okra text-on-surface/60">
                  {selectedSeats.length} Seats
                </Text>
              </View>

              <View className="mt-4 border-t border-border pt-4">
                <Text className="text-base font-okra font-bold text-on-surface">
                  Fare Breakdown
                </Text>
                <View className="flex-row items-center justify-between mt-2">
                  <Text className="text-sm font-okra text-on-surface/60">
                    Ticket Price ({selectedSeats.length} Seats)
                  </Text>
                  <Text className="text-sm font-okra text-on-surface">
                    Rs {busAndSeatData.price * selectedSeats.length}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center justify-between mt-4 border-t border-border pt-4">
                <Text className="text-base font-okra font-bold text-on-surface">
                  Total Amount
                </Text>
                <Text className="text-base font-okra font-bold text-on-surface">
                  Rs {busAndSeatData.price * selectedSeats.length}
                </Text>
              </View>
            </View>
          </ScrollView>
          <View className="px-4 pb-4 bg-surface">
            <Button
              label={paying ? 'PLEASE WAIT' : 'Book Now'}
              onPress={handlePayNow}
              disabled={paying || selectedSeats.length === 0}
            />
          </View>

          {ticketVisible && (
            <TicketModal
              visible={ticketVisible}
              onClose={() => {
                setTicketVisible(false);
                navigation.reset({
                  index: 1,
                  routes: [{ name: 'HomeScreen' }, { name: 'BookingsScreen' }],
                });
              }}
              bookingInfo={{
                from: busAndSeatData.from,
                to: busAndSeatData.to,
                departureTime: convertToLocalTime(busAndSeatData.departureTime),
                arrivalTime: convertToLocalTime(busAndSeatData.arrivalTime),
                date: new Date(busAndSeatData.departureTime).toDateString(),
                company: busAndSeatData.company,
                busType: busAndSeatData.busType,
                seats: bookedTicket?.seatNumbers,
                ticketNumber: bookedTicket?._id || 'xxxxxxxxxx',
                pnr: bookedTicket?.pnr || 'xxxxxxxxxxx',
                fare: `${busAndSeatData.price * selectedSeats.length}`,
              }}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default SeatSelectionScreen;
