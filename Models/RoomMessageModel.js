
class RoomMessage {
    constructor(id, messageContent,idRoom, idUser) {
        this._id = id
        this.text = messageContent
        this.idRoom = idRoom


        this.user = {
            _id: idUser,
            name: "John",
        }
    }
}

export default RoomMessage ;