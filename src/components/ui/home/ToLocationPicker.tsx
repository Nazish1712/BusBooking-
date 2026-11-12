import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CheckIcon } from 'react-native-heroicons/solid';
import { fetchLocations } from '../../../service/requests/locations';
import Shimmer from '../ui/Shimmer';
import ErrorComponent from '../ui/Error';

type ToLocationPickerProps = {
  visible: boolean;
  toCity: string;
  onClose: () => void;
  onSetToCity: (city: string) => void;
};

const ToLocationPicker = ({
  visible,
  toCity,
  onClose,
  onSetToCity,
}: ToLocationPickerProps) => {
  const [search, setSearch] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    let active = true;

    const query = search.trim();

    setIsLoading(true);

    const locations = setTimeout(() => {
      fetchLocations(query)
        .then(result => {
          if (active) {
            setIsLoading(false);
            setCities(result);
            setError(null);
          }
        })
        .catch(error => {
          if (active) {
            setIsLoading(false);
            setCities([]);
            setError(error);
          }
        });
    }, 300);

    return () => {
      active = false;
      clearTimeout(locations);
    };
  }, [search, visible]);

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
          onPress={onClose}
        />

        <View
          style={{ flex: 3 }}
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

          {isLoading ? (
            <Shimmer />
          ) : error ? (
            <ErrorComponent error={error} />
          ) : cities.length === 0 ? (
            <Text className="text-base font-okra text-on-surface/40">
              No city found.
            </Text>
          ) : (
            <FlatList
              className="flex-1"
              data={cities}
              extraData={toCity}
              keyExtractor={item => item}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const isSelected = item === toCity;

                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSearch('');
                      onSetToCity(item);
                      onClose();
                    }}
                    className={`flex-row items-center justify-between py-4 border-b border-border ${
                      isSelected ? 'bg-secondary/40 px-4 rounded-lg' : ''
                    }`}
                  >
                    <Text className="text-base font-okra text-on-surface">
                      {item}
                    </Text>

                    {isSelected && <CheckIcon size={16} color="#CF3239" />}
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ToLocationPicker;
