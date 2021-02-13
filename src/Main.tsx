import ConnectionList from "./Connection/ConnectionList";
import {StyleSheet, View} from "react-native";
import React from "react";
import ConnectionEdit from "./Connection/ConnectionEdit";
import ConnectionDetail from "./Connection/ConnectionDetail";
import {Scene, Stack} from "react-native-router-flux";


export default function Main() {
    return (
        <View style={styles.container}>
            <Stack key="root">
                <Scene key="list" component={ConnectionList} />
                <Scene key="edit" component={ConnectionEdit} />
                <Scene key="detail" component={ConnectionDetail} />
            </Stack>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 32
    },
});
