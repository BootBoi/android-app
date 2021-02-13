import React from "react";
import {Text, View} from "react-native";
import {StackNavigationOptions, StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../Main";
import {Connection} from "./Connection";


type EditScreenNavigationProp = StackNavigationProp<RootStackParamList, 'edit'>;
type EditScreenRouteProp = RouteProp<RootStackParamList, 'edit'>;

interface Props {
    navigation: EditScreenNavigationProp;
    route: EditScreenRouteProp;
}

export const ConnectionEditSetTitle = ({route}: Props): StackNavigationOptions => {
    const connection: Connection | undefined = route.params;
    return {title: connection === undefined ? "Create Connection" : `Edit ${connection.name}`};
};

export default function ConnectionEdit(props: Props) {
    const {route} = props;
    const connection: Connection | undefined = route.params;
    return (<View>
        {connection === undefined ? <Text>Create</Text> : <Text>Edit {connection.name}</Text>}
    </View>);
}
