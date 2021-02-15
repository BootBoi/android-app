import React from 'react';
import {NativeModules, StyleSheet, View} from 'react-native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import {RootStackParamList} from '../Main';
import {RouteProp} from '@react-navigation/native';
import LargeButton from '../Component/LargeButton';
import {DefaultTheme} from 'react-native-paper';

type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'detail'
>;
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'detail'>;

interface Props {
  navigation: DetailScreenNavigationProp;
  route: DetailScreenRouteProp;
}

export const ConnectionDetailSetTitle = ({
  route,
}: Props): StackNavigationOptions => ({title: route.params.name});

export default function ConnectionDetail(props: Props) {
  const {route, navigation} = props;
  const connection = route.params;
  const {RemoteCommunicationModule} = NativeModules;

  const onTurnOn = () => {
    console.log('clicked turn on');
    RemoteCommunicationModule.wakeUp(connection.lanConnection?.macAddress)
      .then((result: any) => {
        console.log('great success', result);
      })
      .catch((error: any) => {
        console.error('oh no', error);
      });
  };
  const onTurnOff = () => {};
  const onConfigure = () => {
    navigation.navigate('edit', connection);
  };

  return (
    <View style={styles.container}>
      <LargeButton onClick={onTurnOn} color="#35bf5c" icon="play-circle">
        Turn On
      </LargeButton>
      <LargeButton onClick={onTurnOff} color="#ea4335" icon="power-off">
        Turn Off
      </LargeButton>
      <LargeButton
        onClick={onConfigure}
        color={DefaultTheme.colors.disabled}
        icon="cogs">
        Configure
      </LargeButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 8,
  },
});
