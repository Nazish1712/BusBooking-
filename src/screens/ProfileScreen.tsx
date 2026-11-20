import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  TicketIcon,
  QuestionMarkCircleIcon,
  EllipsisVerticalIcon,
} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { getMe, logout } from '../service/requests/auth';
import Shimmer from '../components/ui/ui/Shimmer';
import ErrorComponent from '../components/ui/ui/Error';
import { Button } from '../components/ui/ui/Button';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signOutVisible, setSignOutVisible] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    setLoading(true);

    getMe()
      .then(result => {
        setLoading(false);
        setError('');
        setUser(result);
      })
      .catch(error => {
        setLoading(false);
        setUser(null);
        if (error?.message === 'Please login again') {
          setError('');
          return;
        }
        setError(error?.message);
      });
  }, []);

  const handleConfirmSignOut = () => {
    setSigningOut(true);
    logout()
      .then(() => {
        setSigningOut(false);
        setUser(null);
        setSignOutVisible(false);
        navigation.navigate('LoginScreen');
      })
      .catch(error => {
        setSigningOut(false);
        setError(error?.message);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral" edges={['top', 'bottom']}>
      {loading ? (
        <Shimmer />
      ) : error ? (
        <ErrorComponent error={error} />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="flex-grow pb-4"
          >
            <View className="bg-tertiary px-4 pt-4 pb-10 rounded-b-3xl">
              <View className="flex-row items-center justify-between">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ArrowLeftIcon size={18} color="#ffffff" />
                </TouchableOpacity>
                <View className="flex-row items-center">
                  <TouchableOpacity className="border border-white/70 px-3 py-1 rounded-full mr-3">
                    <Text className="text-white font-okra text-sm">Help</Text>
                  </TouchableOpacity>
                  <EllipsisVerticalIcon size={18} color="#ffffff" />
                </View>
              </View>

              <Text className="text-white font-okra font-bold text-3xl mt-8">
                {user?.name || 'Guest'}
              </Text>
              <Text className="text-white/80 font-okra text-sm mt-2">
                Guest account
              </Text>
            </View>

            {!user && (
              <View className="mx-4 mt-4 bg-surface rounded-2xl p-4 border border-border">
                <Text className="font-okra text-on-surface mb-4">
                  Continue as guest to book seats.
                </Text>
                <Button
                  label="CONTINUE AS GUEST"
                  onPress={() => navigation.navigate('LoginScreen')}
                />
              </View>
            )}

            <View className="mx-4 mt-4 bg-surface rounded-2xl border border-border overflow-hidden">
              <TouchableOpacity
                onPress={() => navigation.navigate('BookingsScreen')}
                className="flex-row items-center justify-between px-4 py-4 border-b border-border"
              >
                <View className="flex-row items-center">
                  <TicketIcon size={18} color="#111827" />
                  <Text className="ml-3 font-okra text-base text-on-surface">
                    My Bookings
                  </Text>
                </View>
                <ChevronRightIcon size={16} color="#111827" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between px-4 py-4">
                <View className="flex-row items-center">
                  <QuestionMarkCircleIcon size={18} color="#111827" />
                  <Text className="ml-3 font-okra text-base text-on-surface">
                    Help & Support
                  </Text>
                </View>
                <ChevronRightIcon size={16} color="#111827" />
              </TouchableOpacity>
            </View>
          </ScrollView>

          {!!user && (
            <View className="px-4 pb-4">
              <Button
                label="SIGN OUT"
                onPress={() => setSignOutVisible(true)}
              />
            </View>
          )}
        </>
      )}

      <Modal visible={signOutVisible} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="bg-surface w-full rounded-2xl p-5">
            <Text className="font-okra font-bold text-lg text-on-surface text-center">
              Sign out?
            </Text>
            <Text className="font-okra text-sm text-on-surface/60 text-center mt-2">
              You will need to continue as guest again to book seats.
            </Text>

            <View className="mt-6">
              <Button
                label={signingOut ? 'PLEASE WAIT' : 'YES, SIGN OUT'}
                onPress={handleConfirmSignOut}
                disabled={signingOut}
              />
              <TouchableOpacity
                onPress={() => setSignOutVisible(false)}
                disabled={signingOut}
                className="mt-4"
              >
                <Text className="text-center font-okra font-semibold text-on-surface/60">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;
