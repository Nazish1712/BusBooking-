import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { continueAsGuest } from '../service/requests/auth';
import { Button } from '../components/ui/ui/Button';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [guestLoading, setGuestLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGuest = () => {
    setGuestLoading(true);
    setError('');
    continueAsGuest()
      .then(() => {
        setGuestLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        });
      })
      .catch(error => {
        setGuestLoading(false);
        setError(error?.message);
      });
  };

  return (
    <View className="flex-1 bg-surface">
      <View className="absolute top-12 left-4 z-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-surface/90 p-2 rounded-full"
        >
          <ArrowLeftIcon size={16} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-surface">
        <Image
          source={require('../assets/images/cover.jpeg')}
          className="w-full h-64"
          resizeMode="cover"
        />

        <View className="p-4">
          <Text className="font-okra font-semibold text-xl text-center text-on-surface">
            Continue to book
          </Text>
          <Text className="text-center font-okra text-sm text-on-surface/60 mt-2">
            Book a seat as a guest.
          </Text>

          <View className="mt-10">
            <Button
              label={guestLoading ? 'PLEASE WAIT' : 'CONTINUE AS GUEST'}
              onPress={handleGuest}
              disabled={guestLoading}
            />
            {error && (
              <Text className="text-error font-okra text-sm text-center mt-4">
                {error}
              </Text>
            )}
          </View>

          <Text className="font-okra text-sm text-on-surface/60 font-medium text-center mt-12 w-4/5 self-center">
            By continuing as guest you agree to our Terms and Conditions and
            Privacy Policy.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
