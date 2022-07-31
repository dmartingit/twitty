import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Container} from '@material-ui/core';
import {AuthProvider} from "./contexts/AuthContext";
import {NavBar} from "./components/NavBar";
import {SignUpPage} from "./pages/SignUpPage";
import {SignInPage} from "./pages/SignInPage";
import {SignOutPage} from "./pages/SignOutPage";
import {HomePage} from "./pages/HomePage";
import {ConfirmEmailPage} from "./pages/ConfirmEmailPage";
import {EditProfilePage} from "./pages/EditProfilePage";
import {ErrorPage} from "./pages/ErrorPage";

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavBar/>
                <Container maxWidth="sm">
                    <Routes>
                        <Route path="/signup" element={<SignUpPage/>}/>
                        <Route path="/signin" element={<SignInPage/>}/>
                        <Route path="/signout" element={<SignOutPage/>}/>
                        <Route path="/confirm-signup" element={<ConfirmEmailPage/>}/>
                        <Route path="/profile/edit" element={<EditProfilePage/>}/>
                        <Route path="/error" element={<ErrorPage/>}/>
                        <Route path="/" element={<HomePage/>}/>
                    </Routes>
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;
