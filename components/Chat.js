import { Avatar } from "@material-ui/core";
import { collection, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

function Chat(props) {
    const router = useRouter();
    const { users, id } = props;
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(
        query(
            collection(db, "users"),
            where("email", "==", getRecipientEmail(users, user))
        )
    );

    const enterChat = ()=> {
        router.push(`/chat/${id}`);
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const recipientEmail = getRecipientEmail(users, user);


    return (
        <Container onClick={enterChat}>
            {recipient?(
                <UserAvatar src = {recipient?.photoURL}/>
            ):(
                <UserAvatar>{recipientEmail[0]}</UserAvatar>

            )}
            <p>{recipientEmail}</p>
        </Container>
    );

}

export default Chat;

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    word-break: break-word;
    cursor: pointer;

    :hover {
        background-color: #e9eaeb;
    }
`;

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`;
