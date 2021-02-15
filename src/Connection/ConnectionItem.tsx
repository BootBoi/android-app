import React from 'react';
import {Connection} from './Connection';
import {Card, Paragraph, Title} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  connection: Connection;
  onClick: () => void;
}

export default function ConnectionItem(props: Props) {
  const {connection, onClick} = props;
  const onStartShouldSetResponder = () => {
    onClick();
    return true;
  };

  const {cover} = StyleSheet.create({
    cover: {
      backgroundColor: connection.color,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 16,
      paddingBottom: 16,
    },
  });
  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={onStartShouldSetResponder}>
      <Card>
        <View style={cover}>
          <Icon style={styles.coverIcon} name={connection.icon} />
        </View>
        <Card.Content style={styles.content}>
          <Title numberOfLines={1}>{connection.name}</Title>
          <Paragraph numberOfLines={1}>
            {connection.description || connection.lanConnection?.macAddress}
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    width: 160,
  },
  content: {
    paddingTop: 8,
  },
  coverIcon: {
    fontSize: 40,
    color: '#ffffff',
  },
});
