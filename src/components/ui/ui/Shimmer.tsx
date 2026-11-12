import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

const Shimmer = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <View className="flex-1">
      {[1, 2, 3, 4, 5].map(item => (
        <View
          key={item}
          className="flex-row items-center py-4 border-b border-border"
        >
          {/* City icon placeholder */}
          <Animated.View
            style={{ opacity }}
            className="w-10 h-10 rounded-full bg-neutral"
          />

          {/* City name placeholder */}
          <Animated.View
            style={{ opacity }}
            className="h-4 w-36 rounded-full bg-neutral ml-4"
          />
        </View>
      ))}
    </View>
  );
};

export default Shimmer;
