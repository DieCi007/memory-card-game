import React from 'react';
import styles from './App.module.scss';
import { Navigate, Route, Routes } from 'react-router-dom';

const HomeLazy = React.lazy(() => import('./feature/home/page/home/Home'));
const GameLazy = React.lazy(() => import('./feature/home/page/game/Game'));

function App() {
    return (
        <div className={styles.container}>
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
