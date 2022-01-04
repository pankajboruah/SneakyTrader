import React from 'react';

import WatchlistContainer from 'modules/WatchlistContainer';

import styles from './App.module.scss';

function App() {
	return (
		<div className={styles.container}>
			<WatchlistContainer />
		</div>
	);
}

export default App;
