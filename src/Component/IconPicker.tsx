import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ALL_ICONS, IconType} from '../Connection/Connection';

interface Props {
  originalIcon: IconType;
  onIconChange: (icon: IconType) => void;
  component: JSX.Element;
}

export default function IconPicker(props: Props) {
  const {originalIcon, onIconChange, component} = props;
  const [currentIcon, setCurrentIcon] = useState(originalIcon);

  const onTouchEnd = (isLeft: boolean) => {
    const currentIndex = ALL_ICONS.indexOf(currentIcon);
    if (currentIndex === -1) {
      throw Error('IconPicker: currentIcon not in available icons??');
    }
    const lastIndex = ALL_ICONS.length - 1;
    let newIndex;
    if (isLeft) {
      newIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    } else {
      newIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    }
    const newIcon = ALL_ICONS[newIndex];
    onIconChange(newIcon);
    setCurrentIcon(newIcon);
  };

  return (
    <View style={styles.container}>
      <View style={styles.chevronContainer} onTouchEnd={() => onTouchEnd(true)}>
        <Icon name="chevron-left" style={styles.chevron} />
      </View>
      {component}
      <View
        style={styles.chevronContainer}
        onTouchEnd={() => onTouchEnd(false)}>
        <Icon name="chevron-right" style={styles.chevron} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chevron: {
    color: '#000000',
    fontSize: 56,
  },
  chevronContainer: {
    padding: 32,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
