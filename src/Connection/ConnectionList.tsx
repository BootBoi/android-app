import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Connection} from "./Connection";
import ConnectionItem from "./ConnectionItem";

const connections: Connection[] = [
    {
        name: "Big NAS",
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
        name: "Test Laptop",
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
        name: "Raspberry",
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

export default function ConnectionList() {
    return (
        <View style={styles.container}>
            {
                connections.map(connection => <ConnectionItem connection={connection} />)
            }
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
