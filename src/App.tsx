import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Container} from "@mui/material";
import {QueryClient, QueryClientProvider} from "react-query";
import {AuthProvider} from "./contexts/AuthContext";
import {NavBar} from "./components/NavBar";
import {SignUpPage} from "./pages/SignUpPage";
import {SignInPage} from "./pages/SignInPage";
import {SignOutPage} from "./pages/SignOutPage";
import {ConfirmEmailPage} from "./pages/ConfirmEmailPage";
import {EditProfilePage} from "./pages/EditProfilePage";
import {ErrorPage} from "./pages/ErrorPage";
import {ViewProfilePage} from "./pages/ViewProfilePage";
import {TweetPage} from "./pages/TweetPage";
import {ColorModeProvider} from "./contexts/ColorModeContext";

const queryClient = new QueryClient();

function App() {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ColorModeProvider>
                        <NavBar/>
                        <Container maxWidth="sm">
                            <Routes>
                                <Route path="/signup" element={<SignUpPage/>}/>
                                <Route path="/sign-in" element={<SignInPage/>}/>
                                <Route path="/sign-out" element={<SignOutPage/>}/>
                                <Route path="/confirm-signup" element={<ConfirmEmailPage/>}/>
                                <Route path="/profile/edit" element={<EditProfilePage/>}/>
                                <Route path="/profile" element={<ViewProfilePage/>}/>
                                <Route path="/error" element={<ErrorPage/>}/>
                                <Route path="/" element={<TweetPage/>}/>
                            </Routes>
                        </Container>
                    </ColorModeProvider>
                </Router>
            </QueryClientProvider>
        </AuthProvider>
    )
        ;
}

export default App;
