import { Button } from "@material-ui/core";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import Head from "next/head";
import styled from "styled-components"
import { auth, provider } from "../firebase";

function Login() {

    const signIn = () => {
        // auth.signInWithPopUp(provider).catch(alert);
        // signInWithPopup(auth, provider).catch(alert);
        signInWithRedirect(auth, provider).catch(alert);
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"/>
                <Button variant="outlined" onClick={signIn}>Sign in with google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login


const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.15);
`;

const LoginContainer = styled.div`
    padding: 100px;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
`;

const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;

`;