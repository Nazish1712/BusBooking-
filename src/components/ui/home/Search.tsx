import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { images } from '../../../assets/images'
import { ChevronRightIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid'
import { formatJourneyDate } from '../../../utils/DateUtils'
import { useNavigation } from '@react-navigation/native'
import { Button } from '../ui/Button'



const Search = () => {

const navigation = useNavigation<any>();

const [from, setFrom] = useState("Lucknow")
const [to, setTo] = useState("Mumbai")
const [date, setDate] = useState(new Date())
const [showDatePicker, setShowDatePicker] = useState(false);
const [showFromPicker, setShowFromPicker] = useState(false);
const [showToPicker, setShowToPicker] = useState(false);
const [error, setError] = useState< string | null>(null);

const handleSearchBuses = () => {
    const problems:  string[] = []
    if(!from) {
        problems.push("Select a departure city.")
    }
    if(!to) {
        problems.push("Select a destination city.")
    }
    if(from && to && from === to) {
        problems.push("Departure and destination cannot be same.")
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if(date < today){
        problems.push("Select today or a future date.")
    }
    
   if(problems.length > 0) {
    setError(problems.join(''))
    return;
   }

   setError(null)
   navigation.navigate('BusListScreen', {item:{from, to, date}})

}

  return (
    <View>
      <View className="bg-surface px-4 pt-4">
       <View   className="bg-surface rounded-2xl px-3 py-1 border border-border shadow-md">
         <TouchableOpacity
            className="flex-row items-center py-3"
            onPress={() => setShowFromPicker(true)}>
            <View className="h-10 w-10 rounded-2xl bg-neutral items-center justify-center">
              <Image
                source={images.logo}
                className="h-5 w-5"
              />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-xs font-okra text-on-surface/50">From</Text>
              <Text className="text-base font-okra font-semibold text-on-surface">
                {from}
              </Text>
            </View>
            <ChevronRightIcon size={18} color="#11182766" />
          </TouchableOpacity>
          <View className="h-px bg-border" />
          <TouchableOpacity
            className="flex-row items-center py-3"
            onPress={() => setShowToPicker(true)}>
            <View className="h-10 w-10 rounded-2xl bg-neutral items-center justify-center">
              <Image
                source={images.logo}
                className="h-5 w-5"
              />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-xs font-okra text-on-surface/50">To</Text>
              <Text className="text-base font-okra font-semibold text-on-surface">
                {to}
              </Text>
            </View>
            <ChevronRightIcon size={18} color="#11182766" />
          </TouchableOpacity>



          <View className="h-px bg-border" />


           <TouchableOpacity
            className="flex-row items-center py-3"
            onPress={() => setShowDatePicker(true)}>
            <View className="h-10 w-10 rounded-2xl bg-neutral items-center justify-center">
              <Image
                source={images.logo}
                className="h-5 w-5"
              />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-xs font-okra text-on-surface/50">Journey Date</Text>
              <Text className="text-base font-okra font-semibold text-on-surface">
                {formatJourneyDate(date)}
              </Text>
            </View>
            <ChevronRightIcon size={18} color="#11182766" />
          </TouchableOpacity>
         </View>
          {error ? <Text className="text-error font-okra text-sm mt-4">{error}</Text> : null}
          <Button className='mt-10' label="Search Buses" onPress={handleSearchBuses} icon={<MagnifyingGlassIcon color={'#ffffff'} size={20}/>}/>
      </View>
    </View>
  )
}

export default Search