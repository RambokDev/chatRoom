import * as React from 'react';
import Room from '../Models/RoomModel';
import RoomMessage from "../Models/RoomMessageModel";

export const SET_ROOMS = 'SET_ROOMS';


export const fetchRooms = (id) => {

    return async dispatch => {

        const response = await fetch(
            'https://exescript.fr/exp2/room/roomFetch',
            {
                method: 'POST',
                    headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                    id_users: id,

                })
            }

        );

        const responseJSON = await response.json();

        // console.log(responseJSON);
        const loadedRooms = [];
        for (const room in responseJSON) {
            const Messages = await fetchRoomsMessages(responseJSON[room].id_room);
            loadedRooms.push(

                new Room(
                    responseJSON[room].id_room,
                    responseJSON[room].name_room,
                    Messages
                    // visibility
                )
            )

        }
        //console.log(loadedRooms)
        dispatch({type: SET_ROOMS, rooms: loadedRooms})

    }

}



export const fetchRoomsMessages = async (id_room) => {


    // return async dispatch => {
        const response = await fetch('https://exescript.fr/exp2/room/roomMessage',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_room: id_room,

                })
            },




        );


        const responseJSON = await response.json();
        console.log(responseJSON)

        // console.log(responseJSON);
        const loadedRoomsMessages = [];
        for (const roomMessage in responseJSON) {
            loadedRoomsMessages.push(
                new RoomMessage(
                    responseJSON[roomMessage].id_message,
                    responseJSON[roomMessage].message,
                    responseJSON[roomMessage].id_room,
                    responseJSON[roomMessage].id_users,

                    // visibility
                )
            )

        }

        return loadedRoomsMessages;


        //console.log(loadedRooms)
        // dispatch({type: SET_ROOMS, roomsMessages: loadedRoomsMessages})

        // }

    }


/**
 * insert a new message in the database with a post request
 */
export const insertMessage = async (newMessage, room) => {

    console.log( "Message : " , newMessage);
    const message = newMessage[0].text;
    const user = newMessage[0].user._id;
    console.log("room : ", room);
    console.log("Message : ", message)
    console.log("User : " , user)



    // return async  => {
        console.log("ok")

        const response = await fetch(
            'https://exescript.fr/exp2/room/roomInsertMessage',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    id_room : room,
                    id_users : user,
                    message : message
                })
            }
        )

        const responseJSON = await response.json()
        console.log(responseJSON)

        //dispatch({type: CREATE_PRODUCT, product: loadedProducts})
    // }
}





