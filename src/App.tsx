import React from 'react';
import styles from './App.scss';
import Main from './shared/Main';
import Header from './shared/Header';
import Sidebar from './shared/Sidebar';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.main}>
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;
