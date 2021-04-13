import React, {useState} from 'react';
import {Linking, ScrollView, StyleSheet, View} from 'react-native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../Main';
import {Connection} from './Connection';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {
  deleteConnection,
  insertOrUpdateConnection,
} from './ConnectionStoreHelper';
import ConnectionItem from './ConnectionItem';
import ColorPicker from '../Component/ColorPicker';
import IconPicker from '../Component/IconPicker';
import {Text} from 'react-native';

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

function hasOnlyDigits(value: string) {
  return /^\d+$/.test(value);
}

export default function ConnectionEdit(props: Props) {
  const {route, navigation} = props;
  const editedConnection = route.params;
  const [, setSaveLoading] = useState(false);
  const initialConnection: Connection = {
    id: Date.now(),
    color: '#0476E9',
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

  async function onSave() {
    setSaveLoading(true);
    await insertOrUpdateConnection(connection);
    setSaveLoading(false);
    navigation.goBack();
  }

  async function onDelete() {
    await deleteConnection(connection);
    navigation.goBack();
    navigation.goBack();
  }

  const [connection, setConnection] = React.useState<Connection>(
    editedConnection || initialConnection,
  );

  const isInitialConnection = initialConnection.id === connection.id;
  const isMacAddressValid =
    connection.lanConnection.macAddress.match(
      /([0-9A-F]{2}[:]){5}([0-9A-F]{2})/,
    ) !== null;
  const showMacAddressError = !isInitialConnection && !isMacAddressValid;
  const isSaveDisabled = !isMacAddressValid;

  return (
    <ScrollView>
      <View style={styles.container}>
        <IconPicker
          originalIcon={connection.icon}
          onIconChange={(icon) => setConnection({...connection, icon: icon})}
          component={<ConnectionItem connection={connection} />}
        />
        <ColorPicker
          originalColor={connection.color}
          onColorChange={(color) =>
            setConnection({...connection, color: color})
          }
        />
        <TextInput
          style={styles.input}
          label="Connection Name"
          value={connection.name}
          onChangeText={(text) => setConnection({...connection, name: text})}
        />
        <TextInput
          style={styles.input}
          label="MAC Address"
          value={connection.lanConnection.macAddress}
          error={showMacAddressError}
          onChangeText={(text) =>
            setConnection({
              ...connection,
              lanConnection: {...connection.lanConnection, macAddress: text},
            })
          }
        />
        {showMacAddressError && (
          <HelperText type="error">
            The MAC Address needs to be in the format A1:B2:C3:D4:E5:F6.
          </HelperText>
        )}
        <HelperText type="info">
          Wake On LAN Needs to be enabled in the BIOS of the machine you want to
          power on!{'  '}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                'https://github.com/BootBoi/android-app/#power-on',
              )
            }>
            Read more here.
          </Text>
        </HelperText>
        <TextInput
          style={styles.input}
          label="SSH Host"
          value={connection.sshConnection.domain}
          onChangeText={(text) =>
            setConnection({
              ...connection,
              sshConnection: {...connection.sshConnection, domain: text},
            })
          }
        />
        <TextInput
          style={styles.input}
          label="SSH Username"
          value={connection.sshConnection.username}
          onChangeText={(text) =>
            setConnection({
              ...connection,
              sshConnection: {...connection.sshConnection, username: text},
            })
          }
        />
        <HelperText type="info">
          This SSH User needs have sudo access to whoami, poweroff and reboot!
          {'  '}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                'https://github.com/BootBoi/android-app/#power-off--reboot',
              )
            }>
            Read more here.
          </Text>
        </HelperText>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          label="SSH Password"
          value={connection.sshConnection.password}
          onChangeText={(text) =>
            setConnection({
              ...connection,
              sshConnection: {...connection.sshConnection, password: text},
            })
          }
        />
        <TextInput
          style={styles.input}
          label="SSH Port"
          value={connection.sshConnection.port + ''}
          onChangeText={(text) => {
            if (!hasOnlyDigits(text)) {
              return;
            }
            const number = parseInt(text, 10);
            setConnection({
              ...connection,
              sshConnection: {
                ...connection.sshConnection,
                port: number,
              },
            });
          }}
        />
        <View style={styles.buttonContainer}>
          <Button
            color="#35bf5c"
            dark={true}
            style={styles.button}
            mode="contained"
            disabled={isSaveDisabled}
            onTouchEnd={onSave}>
            Save
          </Button>
          {editedConnection && (
            <Button
              color="#ea4335"
              dark={true}
              style={styles.button}
              mode="contained"
              onTouchEnd={onDelete}>
              Delete
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: '45%',
    margin: 8,
  },
  input: {
    margin: 8,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
