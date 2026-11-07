import { View, Text, Image } from 'react-native'
import React from 'react'

const SplashScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
      source={require('../assets/images/logo_t.png')}
      className="h-[30%] w-[60%]"
      resizeMode="contain"/>
    </View>
  )
}

export default SplashScreen