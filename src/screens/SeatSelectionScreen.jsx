import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { images } from '../assets/images';

const SeatSelectionScreen = () => {

    const navigation = useNavigation()

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      <View className="flex-row bg-surface px-4 py-4 items-center border-b border-border ">
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <ArrowLeftIcon size={16} color="#11827"/>
        </TouchableOpacity>
        <View className="ml-4 flex-1">
          <Text className="text-base font-okra font-bold text-on-surface">
            Seat Selection
          </Text>
          <Text className="text-sm font-okra text-on-surface/60">hi</Text>
        </View>
      </View>
      <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-surface"
      contentContainerClassName='px-4 pb-6'>
     <View className="flex-row items-center mt-4">
          <Image
            source={images.logo}
            className="h-6 w-8"
          />
          <View className="ml-2 flex-1">
            <Text className="text-base font-okra font-bold text-on-surface">
           hi</Text>
            <Text className="text-xs font-okra text-on-surface/60">hi
          </Text>
          </View>
          <StarIcon size={16} color={'#FDBB8A'} />
          <Text className="text-xs font-okra text-on-surface/60 ml-2">hi
          </Text>
        </View>
        <View className='mt-4'>
          <View className='flex-row items-center justify-between px-2'>
            {[
              {
                label: "Selected",
                box: "bg-green-600",
              },
              {
                label: "Available",
                box: "border-2 border-green-600 bg-surface",
              },
              {
                label: "Booked",
                box: "border-2 border-onSurface/20 bg-neutral",
              },
            ].map((item)=>(
              <View key={item.label} className='flex-row items-center'>
                <View className={`h-4 w-4 rounded mr-2 ${item.box}`}/>
                <Text className='font-okra text-sm text-on-surface'>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeatSelectionScreen;
