import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Search from '../components/ui/home/Search';
import { images } from '../assets/images';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      <View className="flex-row justify-between items-center px-4 py-3">
        <View className="flex-row items-center">
          <Image source={images.logo} className="h-7 w-7" />
          <Text className="font-okra font-bold text-xl ml-2 text-on-surface">
            Journey Miles
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen')}
          className="h-10 w-10 rounded-full bg-accent-soft items-center justify-center"
        >
          <UserIcon color={'#CF3239'} size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-6"
      >
        <View
          className="mx-4 overflow-hidden rounded-2xl"
          style={{ aspectRatio: 1000 / 444 }}
        >
          <Image
            source={images.banner}
            resizeMode="contain"
            className="h-full w-full"
          />
        </View>
        <View className="bg-surface px-4 pt-4">
          <Text className="text-2xl font-okra font-bold text-on-surface">
            Book Bus Tickets
          </Text>
          <Text className="text-sm font-okra text-on-surface/50 mt-1">
            Travel to your favourite destinations
          </Text>
        </View>

        <Search />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
