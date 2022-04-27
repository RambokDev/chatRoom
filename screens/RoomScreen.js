import React, {useCallback, useEffect, useState} from 'react';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {useSelector} from "react-redux";
import { IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import * as RoomAction from "../actions/RoomsActions";
import {insertMessage} from "../actions/RoomsActions";
import {ActivityIndicator} from 'react-native';

export default function RoomScreen({route}) {


    const rooms =  useSelector(state => state.room.rooms)
    // console.log(rooms)

    const roomId = route.params.roomId
    // console.log(roomId)

    const room = rooms.find(room => room.id == roomId);
    // console.log("room" , room);
    // const {roomId} = route.params


    const messages = room.messages;


    // // const messages = useState([room.messages]);
    // console.log("message: " , messages);


    // const [messages, setMessages] = useState(messages2);


    // helper method that is sends a message
    // function handleSend(newMessage = [] , roomId) {
    //     RoomAction.insertMessage(newMessage, roomId)
    //
    //     // setMessages(GiftedChat.append(messages, newMessage));
    // }

    // const handleSend = useCallback((newMessage = []) => {
    //     RoomAction.insertMessage(newMessage, roomId)
    // }, [])
    // helper method that is sends a message
    function handleSend(newMessage = []) {
        RoomAction.insertMessage(newMessage, roomId)
        setMessages(GiftedChat.append(messages, newMessage));
    }


    function renderBubble(props) {
        return (
            // Step 3: return the component
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        // Here is the color change
                        backgroundColor: '#6646ee'
                    }
                }}
                textStyle={{
                    left: {
                        color: '#fff'
                    }
                }}
            />
        );
    }


    function renderSend(props) {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <IconButton icon='send-circle' size={32} color='#6646ee'/>
                </View>
            </Send>
        );
    }


    return (
        <GiftedChat
            messages={messages}
            onSend={newMessage => handleSend(newMessage, roomId)}
            // onSend={messages => onSend(messages)}
            renderBubble={renderBubble}
            user={{
                _id: '1',
                name: "John",
            }}
            placeholder=' Votre Message ...'
            showUserAvatar
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
        />
    )
}



// Step 5: add corresponding styles
const styles = StyleSheet.create({
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});