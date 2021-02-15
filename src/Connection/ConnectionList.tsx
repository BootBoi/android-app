import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Connection} from './Connection';
import ConnectionItem from './ConnectionItem';
import {RootStackParamList} from '../Main';
import {StackNavigationProp} from '@react-navigation/stack';

const connections: Connection[] = [
  {
    name: 'Big NAS',
    icon: 'server',
    color: '#35bf5c',
    lanConnection: {
      macAddress: '80:EE:73:E0:0A:DC',
    },
    sshConnection: {
      domain: '10.0.0.5',
      username: 'bootboi',
      password:
        'c2J3LLpYSGJbNdxuiGGoADPgOxkF22BLtv8C30qjvR7AYOeBHQfMbRUesdaejGdMsa4qa2xjiBi4K3ntJ4e',
      port: 21851,
    },
  },
  {
    name: 'Test Laptop',
    icon: 'laptop',
    color: '#ea4335',
    lanConnection: {
      macAddress: '12:44:e1:ad:h1',
    },
    sshConnection: {
      domain: '10.0.0.5',
      username: 'r00t',
      password: 's3cure',
      port: 22,
    },
  },
  {
    name: 'Raspberry',
    icon: 'tv',
    color: '#f19601',
    lanConnection: {
      macAddress: 'ab:cd:ef:ad:h1',
    },
    sshConnection: {
      domain: '10.0.0.5',
      username: 'r00t',
      password: 's3cure',
      port: 22,
    },
  },
];

const addConnectionItem: Connection = {
  name: 'Create',
  description: 'Connection',
  color: '#1c6697',
  icon: 'plus',
};

type ListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'list'>;

interface Props {
  navigation: ListScreenNavigationProp;
}

export default function ConnectionList(props: Props) {
  const {navigation} = props;
  return (
    <ScrollView>
      <View style={styles.container}>
        {connections.map((connection) => (
          <ConnectionItem
            key={connection.name}
            connection={connection}
            onClick={() => navigation.navigate('detail', connection)}
          />
        ))}
        <ConnectionItem
          connection={addConnectionItem}
          onClick={() => navigation.navigate('edit')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
  },
});
