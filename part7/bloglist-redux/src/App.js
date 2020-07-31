import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import BlogListPage from './pages/BlogListPage';
import BlogPage from './pages/BlogPage';
import UserListPage from './pages/UserListPage';
import UserPage from './pages/UserPage';
import { Container as MuiContainer } from '@material-ui/core';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import NotFoundPage from './pages/NotFoundPage';

const App = () => (
    <>
        <Router>
            <MuiContainer>
                <Switch>
                    <PublicRoute restricted exact path="/login">
                        <LoginPage />
                    </PublicRoute>
                    <PrivateRoute exact path="/">
                        <Navbar />
                        <BlogListPage />
                    </PrivateRoute>
                    <PrivateRoute path="/blogs/:id">
                        <Navbar />
                        <BlogPage />
                    </PrivateRoute>
                    <PrivateRoute exact path="/users">
                        <Navbar />
                        <UserListPage />
                    </PrivateRoute>
                    <PrivateRoute path="/users/:id">
                        <Navbar />
                        <UserPage />
                    </PrivateRoute>
                    <PrivateRoute>
                        <NotFoundPage />
                    </PrivateRoute>
                </Switch>
            </MuiContainer>
        </Router>
    </>
);

export default App;
