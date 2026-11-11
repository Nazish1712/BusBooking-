
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {CheckIcon} from 'react-native-heroicons/solid';
import {locations} from "../../../utils/dummyData";


const ToLocationPicker = ({visible, toCity, onSetToCity, onClose}: {
    visible: boolean;
    toCity: string;
    onSetToCity: (to:string) => void;
    onClose: () => void;
}) => {
  
    const[search, setSearch] = useState("")

    const destinationCity= locations.filter((city)=> city.toLowerCase().includes(search.toLowerCase()))

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
     onRequestClose={onClose}
    >
      <View className="flex-1">

    
        <Pressable
          style={{
            flex: 2,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
          onPress={()=> onClose()}
        />

    
        <View
          style={{flex: 3}}
          className="bg-surface rounded-t-xl px-8 pt-8 pb-8"
        >
    
          <Text className="text-xl font-okra font-bold text-on-surface mb-4">
            Select Destination City
          </Text>

          <TextInput
            className="bg-neutral rounded-lg px-4 py-4 mb-2 text-base font-okra text-on-surface"
            placeholder="Search destination city..."
            placeholderTextColor="#111827"
            value={search}
            onChangeText={setSearch}
          />

          <FlatList
            className="flex-1"
            data={destinationCity}
            extraData={toCity}
            keyExtractor={item => item}
            keyboardShouldPersistTaps="handled"
            renderItem={(data) => {
               const isSelected = data.item === toCity;

              return (
                <TouchableOpacity
                  onPress={() => {
                    setSearch("");
                    onSetToCity(data.item);
                    onClose();
                  }}
                  className={`flex-row items-center justify-between py-4 border-b border-border ${
                    isSelected
                      ? 'bg-secondary/40 px-4 rounded-lg'
                      : ''
                  }`}
                >
                  <Text className="text-base font-okra text-on-surface">
                    {data.item}
                  </Text>

                  {isSelected && (
                    <CheckIcon size={16} color="#CF3239" />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default  ToLocationPicker;


