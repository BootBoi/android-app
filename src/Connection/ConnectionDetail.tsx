import React, {useEffect, useState} from 'react';
import {NativeModules, StyleSheet, View} from 'react-native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import {RootStackParamList} from '../Main';
import {RouteProp} from '@react-navigation/native';
import LargeButton from '../Component/LargeButton';
import {
  Card,
  DefaultTheme,
  Paragraph,
  Title,
  ActivityIndicator,
  Chip,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
  const [canExecuteAsRoot, setCanExecuteAsRoot] = useState<boolean>(false);
  const [canExecuteError, setCanExecuteError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {route, navigation} = props;
  const connection = route.params;
  const {RemoteCommunicationModule} = NativeModules;

  useEffect(() => {
    const {sshConnection} = connection;
    if (!sshConnection) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const {domain, port, username, password} = sshConnection;
    RemoteCommunicationModule.canExecuteAsRoot(domain, port, username, password)
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
  }, []);

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
  const onTurnOff = () => {
    const {sshConnection} = connection;
    if (!sshConnection) {
      return;
    }
    const {domain, port, username, password} = sshConnection;
    RemoteCommunicationModule.powerOff(domain, port, username, password)
      .then((result: any) => {
        console.log('great success', result);
      })
      .catch((error: any) => {
        console.error('oh no', error);
      });
  };
  const onReboot = () => {
    const {sshConnection} = connection;
    if (!sshConnection) {
      return;
    }
    const {domain, port, username, password} = sshConnection;
    RemoteCommunicationModule.reboot(domain, port, username, password)
      .then((result: any) => {
        console.log('great success', result);
      })
      .catch((error: any) => {
        console.error('oh no', error);
      });
  };

  const onConfigure = () => {
    navigation.navigate('edit', connection);
  };

  return (
    <View style={styles.container}>
      <View style={styles.connectionDetail}>
        <Card>
          <Card.Content>
            <Title>{connection.name}</Title>
            {connection.lanConnection && (
              <Paragraph>{connection.lanConnection.macAddress}</Paragraph>
            )}
            {loading && <ActivityIndicator animating={true} />}
            {!loading && (
              <>
                {connection.sshConnection && (
                  <>
                    <Paragraph>
                      {connection.sshConnection.username}@
                      {connection.sshConnection.domain}
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
              </>
            )}
          </Card.Content>
        </Card>
      </View>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 8,
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
