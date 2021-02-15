import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Connection} from './Connection';
import ConnectionItem from './ConnectionItem';
import {RootStackParamList} from '../Main';
import {StackNavigationProp} from '@react-navigation/stack';
import {getStoredConnections} from './ConnectionStoreHelper';

const addConnectionItem: Connection = {
  id: 0,
  name: 'Create',
  description: 'Connection',
  color: '#1c6697',
  icon: 'plus',
};

type ListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'list'>;

interface Props {
  navigation: ListScreenNavigationProp;
}

interface State {
  connections: Connection[];
}

export default function ConnectionList(props: Props) {
  const initialState: State = {
    connections: [],
  };
  const [state, setState] = useState<State>(initialState);
  const {navigation} = props;
  const {connections} = state;

  useEffect(() => {
    return navigation.addListener('focus', () => {
      async function loadConnections() {
        const storedConnections = await getStoredConnections();
        setState({connections: storedConnections});
      }

      loadConnections();
    });
  }, [navigation]);

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
