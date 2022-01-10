import { Avatar, IconButton, Button } from "@material-ui/core";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { signOut } from "firebase/auth";
import { addDoc, collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import Chat from "./Chat";

function Sidebar() {
    const [user] = useAuthState(auth);
    const chatsCol = collection(db, "chats");
    const userChatRef = query(
        chatsCol,
        where("users", "array-contains", user.email)
    );
    const [chatSnapshot] = useCollection(userChatRef);
    const createChat = () => {
        const input = prompt(
            "Please enter an email address of the user you want to chat with"
        );

        if (!input) {
            return;
        }

        if (
            EmailValidator.validate(input) &&
            input !== user.email &&
            !chatAlreadyExists(input)
        ) {
            addDoc(collection(db, "chats"), {
                users: [user.email, input],
            }).then((res) => {
                console.log(res.id);
            });
        }
    };

    const chatAlreadyExists = (recipientEmail) =>
        !!chatSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find((user) => user === recipientEmail)
                    ?.length > 0
        );

    const signOutGoogle = () => {
        signOut(auth);
    };

    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={signOutGoogle} />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in Chats" />
            </Search>

            <SidebarButton onClick={createChat}>Start a new Chat</SidebarButton>

            {/* list of chats */}
            {chatSnapshot?.docs.map((chat) => {
                return <Chat key={chat.id} id={chat.id} users={chat.data().users} />;
            })}
        </Container>
    );
}

export default Sidebar;
const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    pading: 15px;
    heigth: 80px;
    /* border-bottom: 1px solid white; */
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    margin: 10px;

    :hover {
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;

const SearchInput = styled.input`
    outline: none;
    border: none;
    flex: 1;
`;

const SidebarButton = styled(Button)`
    width: 100%;
    /* border: 2px solid red; */

    &&& {
        border-top: 1px solid white;
        border-bottom: 1px solid white;
    }
`;
