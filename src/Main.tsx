import ConnectionList from './Connection/ConnectionList';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import ConnectionEdit, {
  ConnectionEditSetTitle,
} from './Connection/ConnectionEdit';
import ConnectionDetail, {
  ConnectionDetailSetTitle,
} from './Connection/ConnectionDetail';
import {createStackNavigator} from '@react-navigation/stack';
import {Connection} from './Connection/Connection';

export type RootStackParamList = {
  list: undefined;
  edit: Connection | undefined;
  detail: Connection;
};

const Stack = createStackNavigator();

export default function Main() {
  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName="list">
        <Stack.Screen
          options={{title: 'My Connections'}}
          name="list"
          component={ConnectionList}
        />
        <Stack.Screen
          options={ConnectionEditSetTitle}
          name="edit"
          component={ConnectionEdit}
        />
        <Stack.Screen
          options={ConnectionDetailSetTitle}
          name="detail"
          component={ConnectionDetail}
        />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
