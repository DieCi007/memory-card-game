import React from 'react';
import styles from './App.module.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const HomeLazy = React.lazy(() => import('./feature/home/page/home/Home'));
const GameLazy = React.lazy(() => import('./feature/home/page/game/Game'));

function App() {
    return (
        <div className={styles.container}>
            {/*Bypass http error when hosting on github pages*/}
            <Helmet>
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
            </Helmet>
            <Routes>
                <Route path='/' element={<Navigate to='/home'/>}/>
                <Route path='home' element={
                    <React.Suspense fallback='Loading...'><HomeLazy/></React.Suspense>}/>
                <Route path='game' element={
                    <React.Suspense fallback='Loading...'><GameLazy/></React.Suspense>}/>
                <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
        </div>
    );
}

export default App;
