import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, Mic, MoreVert } from "@material-ui/icons";
import {
    addDoc,
    collection,
    doc,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import Message from "./Message";
import TimeAgo from "timeago-react";

function ChatScreen(props) {
    const { chat, messages } = props;
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("");
    const router = useRouter();
    const [messageSnapshot] = useCollection(
        query(
            collection(doc(db, "chats", router.query.id), "messages"),
            orderBy("timestamp", "asc")
        )
    );
    const [recipientSnapshot] = useCollection(
        query(
            collection(db, "users"),
            where("email", "==", getRecipientEmail(chat.users, user))
        )
    );
    const showMessages = () => {
        if (messageSnapshot) {
            return messageSnapshot.docs.map((message) => {
                return (
                    <Message
                        key={message.id}
                        user={message.data().user}
                        message={{
                            ...message.data(),
                            timestamp: message
                                ?.data()
                                .timestamp?.toDate()
                                .getTime(),
                        }}
                    />
                );
            });
        } else {
            return JSON.parse(messages).map((message) => (
                <Message
                    key={message.id}
                    user={message.user}
                    message={message}
                />
            ));
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();

        setDoc(
            doc(db, "users", user.uid),
            {
                lastSeen: serverTimestamp(),
            },
            {
                merge: true,
            }
        );

        addDoc(collection(doc(db, "chats", router.query.id), "messages"), {
            timestamp: serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });

        setInput("");
        scrollToBottom();
    };
    useEffect(() => {
        scrollToBottom()
    }, [messages, messageSnapshot])
    const recipientEmail = getRecipientEmail(chat.users, user);
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const endOfMessageRef = useRef(null);
    const scrollToBottom = () => {
        endOfMessageRef.current.scrollIntoView({
            block: 'start'
        })
    }
    return (
        <Container>
            <Header>
                {recipient ? (
                    <Avatar src={recipient?.photoURL} />
                ) : (
                    <Avatar>{recipientEmail[0]}</Avatar>
                )}
                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>
                            Last active:{" "}
                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo
                                    datetime={recipient?.lastSeen?.toDate()}
                                />
                            ) : (
                                "Unavailable"
                            )}
                        </p>
                    ) : (
                        <p>Loading Last seen...</p>
                    )}
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessageRef}/>
            </MessageContainer>

            <InputContainer>
                <InsertEmoticon />
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Mic />
                <button
                    hidden
                    disabled={!input}
                    type="submit"
                    onClick={sendMessage}
                >
                    send message
                </button>
            </InputContainer>
        </Container>
    );
}

export default ChatScreen;

const Container = styled.div``;
const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;

    > h3 {
        margin-bottom: 3px !important;
    }

    > p {
        font-size: 14px;
        color: gray;
    }
`;
const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`;

const EndOfMessage = styled.div`
    /* margin-bottom: 20px; */
`;

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
`;

const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 10px;
    background-color: whitesmoke;
    padding: 10px;
    margin-left: 15px;
    margin-right: 15px;
`;
