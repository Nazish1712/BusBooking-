import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const Button = ({
  label,
  onPress,
  icon,
  className = '',
  textClassName = '',
  disabled = false,
}: {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`flex-row items-center justify-center rounded-2xl bg-primary px-4 py-4 ${className} ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      {icon ? <View className="mr-2">{icon}</View> : null}
      <Text
        className={`font-okra font-bold text-base text-white ${textClassName}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
