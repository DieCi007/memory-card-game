import React, { useReducer } from 'react';
import styles from './App.module.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AppContext, appStateReducer, INITIAL_STATE } from './shared/AppStateReducer'

const HomeLazy = React.lazy(() => import('./feature/home/page/home/Home'));
const GameLazy = React.lazy(() => import('./feature/home/page/game/Game'));

function App() {
    const [state, dispatch] = useReducer(appStateReducer, INITIAL_STATE);
    return (
        <AppContext.Provider value={{state, dispatch}}>
            <div className={styles.container} data-testid="app">
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
        </AppContext.Provider>
    );
}

export default App;
