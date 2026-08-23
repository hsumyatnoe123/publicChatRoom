import { db } from "./firebase.js";
import { collection, addDoc, onSnapshot, Timestamp, query, where, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";

export function Chatroom(room, username) {
    
    let curroom = room;
    let curuser = username;
    const dbRef = collection(db, 'chats');
    let unsubscribe = null;


    const addChat = async (message) => {
        
        const now = new Date();
        const chatdata = {
            username: curuser,
            room: curroom,
            message,
            created_at: Timestamp.fromDate(now)
            
        };

        try {
            const response = await addDoc(dbRef, chatdata);
            return response;

        } catch(err) {
            console.log("Error addchat = ", err);
            throw err;
            
        }
    }

    const getChats = ( callback ) => {
        // onSnapshot(
        //     query(dbRef,where('room',"==",curroom),orderBy('created_at')),
        //     docSnap => {

            
        //     docSnap.forEach(doc => {
        //         console.log(doc);
                
        //     });
  
        // });



        // if (unsubscribe) {
        //     unsubscribe();
        // }

        if (unsubscribe) unsubscribe();

        unsubscribe = onSnapshot(
            query(dbRef, where('room', "==", curroom)),
            docSnap => {
                const addedMessages = docSnap.docChanges()
                    .filter(item => item.type === "added")
                    .map(item => item.doc.data())
                    .sort((a, b) => a.created_at.toMillis() - b.created_at.toMillis());

                addedMessages.forEach(callback);
            });
    }

    const updateChatroom = ( newroom ) => {
        curroom = newroom;
        console.log(`Room changed to ${curroom}`);
        
    }

    const updateUsername = ( newusername ) => {
        curuser = newusername;
        localStorage.setItem('username', curuser);

        console.log(`Username changed to ${curuser}`);

    }


    // Delete all messages every 15s
    const deleteAllMessages = () => {
        let deleteinter = setInterval(async () => {
            try {
                const getdatas = await getDocs(dbRef);

                // stop function call if no data in firebase
                if (getdatas.empty) {
                    console.log("no message to delete");
                    
                    clearInterval(deleteinter); // stop the interval

                    return;
                }

                getdatas.forEach(async (getdata) => {
                    await deleteDoc(doc(db, 'chats', getdata.id));
                });

                console.log("All messages deleted successsfully");
                
            } catch (error) {
                console.error("Error deleting message : ", error);
            }
        },1000);
    }

    deleteAllMessages();

    return { addChat, getChats, updateChatroom, updateUsername };
}