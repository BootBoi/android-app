import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  originalColor: string;
  onColorChange: (color: string) => void;
}

export default function ColorPicker(props: Props) {
  const availableColors = ['#35bf5c', '#ea4335', '#f19601', '#1c6697', '#976ED7'];
  const { originalColor, onColorChange } = props;
  const [currentColor, setCurrentColor] = useState(originalColor);
  const onTouchEnd = (color: string) => {
    setCurrentColor(color);
    onColorChange(color);
    return true;
  };
  return (
    <View style={styles.container}>
      {availableColors.map((color) => <View key={color} onTouchEnd={() => onTouchEnd(color)}>
        <Text style={{...styles.circle, backgroundColor: color}} />
        {currentColor === color && <Icon style={styles.icon} name="check" />}
      </View>)}
    </View>
  );
}

const circleRadius = 20;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 8,
  },
  circle: {
    width: circleRadius * 2,
    height: circleRadius * 2,
    borderRadius: circleRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 10,
    fontSize: 20,
    color: '#ffffff',
  },
});
