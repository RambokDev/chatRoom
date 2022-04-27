import * as React from 'react';
import {List} from 'react-native-paper';

import {StyleSheet, TouchableOpacity, View} from "react-native";

import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {Text} from "react-native";


export default function RoomItems(prop) {

    const navigation = useNavigation();
    // const rooms = useSelector(state => state.room.rooms)
    // const room = rooms.find(room => room.id == prop.roomId)
    // console.log("room : ",room)
    // console.log('ok55')

    return (


            // <TouchableOpacity
            //     onPress={() => {}}>
            //     <View>
            //         <Text>{room.name}</Text>
            //         <Text>{room.id}</Text>
            //
            //         <View>
            //             {prop.children}
            //         </View>
            //     </View>
            // </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate('Room', { thread: prop.roomName, roomId : prop.roomId})}


        >

            {/*<Text>{prop.roomName}</Text>*/}
            <List.Item
                title={prop.roomName}
                description={prop.roomId}
                titleNumberOfLines={1}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                descriptionNumberOfLines={1}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1
    },
    listTitle: {
        fontSize: 22
    },
    listDescription: {
        fontSize: 16
    }
});