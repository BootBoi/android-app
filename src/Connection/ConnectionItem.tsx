import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {Connection} from "./Connection";

interface Props {
    connection: Connection
}

export default function ConnectionItem(props: Props) {
    const { connection } = props;
    return (
        <View style={styles.container}>
            <Text>{connection.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
