import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../Main';
import {Connection} from './Connection';
import {TextInput} from 'react-native-paper';

type EditScreenNavigationProp = StackNavigationProp<RootStackParamList, 'edit'>;
type EditScreenRouteProp = RouteProp<RootStackParamList, 'edit'>;

interface Props {
  navigation: EditScreenNavigationProp;
  route: EditScreenRouteProp;
}

export const ConnectionEditSetTitle = ({
  route,
}: Props): StackNavigationOptions => {
  const connection: Connection | undefined = route.params;
  return {
    title:
      connection === undefined
        ? 'Create Connection'
        : `Edit ${connection.name}`,
  };
};

export default function ConnectionEdit(props: Props) {
  const {route} = props;
  const initialConnection: Connection = {
    color: '#1c6697',
    icon: 'server',
    name: '',
    lanConnection: {
      macAddress: '',
    },
    sshConnection: {
      username: '',
      port: 22,
      password: '',
      domain: '',
    },
  };
  const [connection, setConnection] = React.useState<Connection>(
    route.params || initialConnection,
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="name"
        value={connection.name}
        onChangeText={(text) => setConnection({...connection, name: text})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 8,
  },
  input: {
    margin: 8,
  },
});
