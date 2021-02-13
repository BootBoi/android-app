import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Connection} from "./Connection";
import ConnectionItem from "./ConnectionItem";

const connections: Connection[] = [
    {
        id: 1,
        name: "Big NAS",
        icon: "server",
        color: "#35bf5c",
        lanConnection: {
            macAddress: "ab:cd:ef:ad:h1"
        },
        sshConnection: {
            domain: "10.0.0.1",
            username: "r00t",
            password: "s3cure",
            port: 22
        }
    },
    {
        id: 2,
        name: "Test Laptop",
        icon: "laptop",
        color: "#ea4335",
        lanConnection: {
            macAddress: "12:44:e1:ad:h1"
        },
        sshConnection: {
            domain: "10.0.0.5",
            username: "r00t",
            password: "s3cure",
            port: 22
        }
    },
    {
        id: 3,
        name: "Raspberry",
        icon: "tv",
        color: "#f19601",
        lanConnection: {
            macAddress: "ab:cd:ef:ad:h1"
        },
        sshConnection: {
            domain: "10.0.0.5",
            username: "r00t",
            password: "s3cure",
            port: 22
        }
    }
];

const addConnectionItem: Connection = {
    id: null,
    name: "Create",
    description: "Connection",
    color: "#1c6697",
    icon: "plus"
}

export default function ConnectionList() {
    return (
        <View style={styles.container}>
            {connections.map(connection => <ConnectionItem key={connection.id} connection={connection} />)}
            <ConnectionItem connection={addConnectionItem} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 8
    },
});
