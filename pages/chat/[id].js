import {
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

function Chat(props) {
    const { chat, messages } = props;
    const [user] = useAuthState(auth);
    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, user)}</title>
            </Head>
            <Sidebar />
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages} />
            </ChatContainer>
        </Container>
    );
}

export default Chat;

export async function getServerSideProps(context) {
    const ref = doc(db, "chats", context.query.id);

    const messagesRef = await getDocs(
        query(collection(ref, "messages"), orderBy("timestamp", "asc"))
    );

    const messages = messagesRef.docs
        .map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        .map((messages) => ({
            ...messages,
            timestamp: messages.timestamp.toDate().getTime(),
        }));

    const chatRes = await getDoc(ref);
    const chat = {
        id: chatRes.id,
        ...chatRes.data(),
    };

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        },
    };
}

const Container = styled.div`
    display: flex;
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`;
