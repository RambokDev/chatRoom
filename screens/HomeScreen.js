import {View, ActivityIndicator, Text, FlatList} from "react-native";
import {useSelector, useDispatch} from "react-redux";


import * as RoomAction from "../actions/RoomsActions";
import RoomItems from '../Components/RoomItems';
import React, {useCallback, useState, useEffect} from "react";
import {StyleSheet} from "react-native";
import {Divider} from "react-native-paper";
import {fetchRooms, fetchRoomsMessages} from "../actions/RoomsActions";


export default function HomeScreen(props) {

    const {route, navigation} = props;

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const rooms = useSelector(state => state.room.rooms)


    // const rooms = useSelector(state => state.room.rooms)
    // const filteredRooms = rooms.filter(room => room.type === category.title && product.visibility)
    const userId = 1;
    const loadedRooms = useCallback(async () => {

        setError(null)
        setIsRefreshing(true)
        try {
            setInterval(async () => {
                await dispatch(RoomAction.fetchRooms(userId));
            }, 1000);

            // await dispatch(RoomAction.fetchRooms(userId))
            // await sleep(1000);


        } catch (error) {
            setError(true)
        }
        setIsRefreshing(false)
    }, [dispatch, setError, setIsRefreshing])

    useEffect(() => {
        const onFocus = navigation.addListener('focus', loadedRooms)
        return () => {

        }
    }, [loadedRooms])


    useEffect(() => {
        setIsLoading(true)
        loadedRooms().then(() => {
            setIsLoading(false)
        })

    }, [setIsLoading, loadedRooms])


    const renderItem = itemData => {
        return (
            <RoomItems
                roomId={itemData.item.id}
                roomName={itemData.item.name}
            />




        )
    }


    if (error) {
        return (
            <View style={styles.error}>

                <Text>une erreur est survenues</Text>

            </View>
        )
    }


    if (isLoading) {
        return (
            <View style={styles.spinner}>
                <ActivityIndicator size='large' color={'#111'}/>

            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <FlatList
                    ItemSeparatorComponent={() => <Divider />}
                    onRefresh={loadedRooms}
                    refreshing={isRefreshing}
                    style={styles.list}
                    numColumns={1}
                    data={rooms}
                    renderItem={renderItem}/>
            </View>
        )
    }


}


const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1
    },

});

