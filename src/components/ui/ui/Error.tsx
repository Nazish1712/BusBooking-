import { View, Text } from 'react-native';
import React from 'react';
import { ExclamationCircleIcon } from 'react-native-heroicons/solid';

type ErrorComponentProps = {
  error: string | null;
};

const ErrorComponent = ({ error }: ErrorComponentProps) => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      {/* Error Icon */}
      <ExclamationCircleIcon size={50} color="#EF4444" />

      {/* OOPS! with horizontal lines */}
      <View className="flex-row items-center w-full my-4">
        <View className="flex-1 h-px bg-error" />

        <Text className="text-error font-okra font-bold text-lg mx-4">
          OOPS!
        </Text>

        <View className="flex-1 h-px bg-error" />
      </View>

      {/* Error Message */}
      <Text className="text-on-surface font-okra text-center text-base">
        {error}
      </Text>
    </View>
  );
};

export default ErrorComponent;
