import React from 'react';
import { View, Text } from 'react-native';

const EntryDetail = ({ navigation, route }) => {
  const { entryId } = route.params;

  const year = entryId.slice(0, 4);
  const month = entryId.slice(5, 7);
  const day = entryId.slice(8);

  navigation.setOptions({ title: `${month}/${day}/${year}` });

  return (
    <View>
      <Text>Entry Detail -{JSON.stringify(entryId)}</Text>
    </View>
  );
};

export default EntryDetail;
