import React from 'react';
import { View, Text } from 'native-base';
import { ActivityIndicator } from 'react-native';

const LoadingActivity = () =>  {
    return (
     <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'center'}}>
        <ActivityIndicator size={"small"} color="#0000ff" />
        <Text>Loading results</Text>
      </View>
    );
}

export default LoadingActivity;