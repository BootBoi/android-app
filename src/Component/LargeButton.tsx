import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import {Card, Title} from 'react-native-paper';

interface Props {
  icon: string;
  color: string;
  children: string;
  onClick: () => void;
}

export default function LargeButton(props: Props) {
  const {icon, children, color, onClick} = props;
  const onTouchEnd = () => {
    onClick();
    return true;
  };
  return (
    <View style={styles.container} onTouchEnd={onTouchEnd}>
      <Card>
        <Card.Content style={{backgroundColor: color}}>
          <Icon style={styles.icon} name={icon} />
          <Title style={styles.title}>{children}</Title>
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
  title: {
    color: '#ffffff',
    textAlign: 'center',
  },
  icon: {
    color: '#ffffff',
    fontSize: 56,
    textAlign: 'center',
  },
});
