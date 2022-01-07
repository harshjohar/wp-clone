import { collection, doc, orderBy, query } from "firebase/firestore";
import Head from "next/head";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { db } from "../../firebase";

function Chat() {
    return (
        <Container>
            <Head>
                <title>Chat</title>
            </Head>
            <Sidebar/>
            <ChatContainer>
                <ChatScreen/>
            </ChatContainer>
            <h1>chat</h1>
        </Container>
    )
}

export default Chat;

// export async function getServerSideProps(context) {
//     const ref = doc(db, "chats", context.query.id);
//     const messageRes = await query(collection(ref, 'messages'), orderBy('timestamp', 'desc'))
// }


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