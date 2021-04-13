import React, {useEffect, useState} from 'react';
import {NativeModules, ScrollView, StyleSheet, View} from 'react-native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import {RootStackParamList} from '../Main';
import {RouteProp} from '@react-navigation/native';
import LargeButton from '../Component/LargeButton';
import {
  ActivityIndicator,
  Card,
  DefaultTheme,
  Paragraph,
  Snackbar,
  Title,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Connection} from './Connection';
import {getStoredConnection} from './ConnectionStoreHelper';

type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'detail'
>;
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'detail'>;

interface Props {
  navigation: DetailScreenNavigationProp;
  route: DetailScreenRouteProp;
}

interface RemoteActionResult {
  message: string;
  success: boolean;
}

export const ConnectionDetailSetTitle = ({
  route,
}: Props): StackNavigationOptions => ({title: route.params.name});

const timeout = 1500;

export default function ConnectionDetail(props: Props) {
  const [canExecuteAsRoot, setCanExecuteAsRoot] = useState<boolean>(false);
  const [canExecuteError, setCanExecuteError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [remoteResultVisible, setRemoteResultVisible] = useState<boolean>(
    false,
  );
  const [remoteResult, setRemoteResult] = useState<RemoteActionResult | null>(
    null,
  );
  const {route, navigation} = props;
  const [connection, setConnection] = useState<Connection>(route.params);
  const {RemoteCommunicationModule} = NativeModules;

  async function loadConnection() {
    const storedConnection = await getStoredConnection(connection.id);
    if (storedConnection) {
      checkSsh(storedConnection);
      setConnection(storedConnection);
    }
  }

  function checkSsh(storedConnection: Connection) {
    const {sshConnection} = storedConnection;
    setLoading(true);
    const {domain, port, username, password} = sshConnection;
    RemoteCommunicationModule.canExecuteAsRoot(
      domain,
      port,
      username,
      password,
      timeout,
    )
      .then((result: any) => {
        setCanExecuteError(null);
        setCanExecuteAsRoot(result);
      })
      .catch((error: any) => {
        setCanExecuteError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    return navigation.addListener('focus', () => {
      loadConnection();
    });
  }, [navigation, loadConnection]);

  const handleRemoteActionPromise = (
    promise: Promise<string>,
    successMessage: string | null = null,
  ) => {
    promise
      .then((result: string) => {
        setRemoteResult({
          message: successMessage || result,
          success: true,
        });
      })
      .catch((error: any) => {
        setRemoteResult({
          message: error.message,
          success: false,
        });
      })
      .finally(() => {
        setRemoteResultVisible(true);
      });
  };

  const onTurnOn = () => {
    const promise = RemoteCommunicationModule.wakeUp(
      connection.lanConnection.macAddress,
    );
    handleRemoteActionPromise(promise, 'Successfully sent Wake on LAN package');
  };
  const onTurnOff = () => {
    const {sshConnection} = connection;
    if (!sshConnection) {
      return;
    }
    const {domain, port, username, password} = sshConnection;
    const promise = RemoteCommunicationModule.powerOff(
      domain,
      port,
      username,
      password,
      timeout,
    );
    handleRemoteActionPromise(promise);
  };
  const onReboot = () => {
    const {sshConnection} = connection;
    if (!sshConnection) {
      return;
    }
    const {domain, port, username, password} = sshConnection;
    const promise = RemoteCommunicationModule.reboot(
      domain,
      port,
      username,
      password,
      timeout,
    );
    handleRemoteActionPromise(promise);
  };

  const onConfigure = () => {
    navigation.navigate('edit', connection);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.connectionDetail}>
            <Card>
              <Card.Content>
                <Title>{connection.name}</Title>
                <Paragraph>{connection.lanConnection.macAddress}</Paragraph>
                {loading && <ActivityIndicator animating={true} />}
                {!loading && (
                  <>
                    <Paragraph>
                      {connection.sshConnection.username}@
                      {connection.sshConnection.domain}:
                      {connection.sshConnection.port}
                    </Paragraph>

                    {canExecuteAsRoot ? (
                      <Paragraph style={styles.successText}>
                        <Icon name="check" /> Logged with sudo
                      </Paragraph>
                    ) : (
                      <Paragraph style={styles.errorText}>
                        <Icon name="times" /> Log in failed
                        {canExecuteError && `: ${canExecuteError}`}
                      </Paragraph>
                    )}
                  </>
                )}
              </Card.Content>
            </Card>
          </View>
          <View style={styles.buttonContainer}>
            <LargeButton onClick={onTurnOn} color="#35bf5c" icon="play-circle">
              Turn On
            </LargeButton>
            <LargeButton onClick={onTurnOff} color="#ea4335" icon="power-off">
              Turn Off
            </LargeButton>
            <LargeButton
              onClick={onReboot}
              color={DefaultTheme.colors.accent}
              icon="sync">
              Reboot
            </LargeButton>
            <LargeButton
              onClick={onConfigure}
              color={DefaultTheme.colors.disabled}
              icon="cogs">
              Configure
            </LargeButton>
          </View>
        </View>
      </ScrollView>
      <Snackbar
        duration={5000}
        visible={remoteResultVisible}
        onDismiss={() => setRemoteResultVisible(false)}>
        <Icon name={remoteResult?.success ? 'check' : 'times'} />{' '}
        {remoteResult?.message}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 8,
  },
  buttonContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  connectionDetail: {
    padding: 8,
  },
  successText: {
    color: '#35bf5c',
  },
  errorText: {
    color: '#ea4335',
  },
});
