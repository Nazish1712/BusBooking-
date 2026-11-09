import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {

const navigation = useNavigation<any>();

useEffect(()=>{
    const timeoutId = setTimeout(()=>{
       navigation.reset({index: 1, routes: [{name: 'HomeScreen'}]})
    },1500)

    return () =>clearTimeout(timeoutId)
},[])

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
      source={require('../assets/images/logo_t.png')}
      className="h-48 w-48"
      resizeMode="contain"/>
    </View>
  )
}

export default SplashScreen