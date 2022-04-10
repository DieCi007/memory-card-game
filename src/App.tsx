import React from 'react';
import styles from './App.module.scss';
import Home from './feature/home/page/Home/Home';

function App() {
    return (
        <div className={styles.container}
             style={{height: window.innerHeight + 'px'}}>
            <Home/>
        </div>
    );
}

export default App;
