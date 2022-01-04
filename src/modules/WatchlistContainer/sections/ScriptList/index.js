import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import WatchlistItem from './components/WatchlistItem';

import styles from './index.module.scss';

const SciptList = ({
	data,
	addScriptToWatchlist,
	removeScriptFromWatchlist,
	totalScriptsAdded,
}) => {
	return (
		<Card bordered={false} className={styles.scriptList}>
			{data.map(
				({ name, exchange, currentPrice, prevPrice, addedToWatchlist }, idx) => (
					<WatchlistItem
						key={idx}
						index={idx}
						name={name}
						exchange={exchange}
						currentPrice={currentPrice}
						prevPrice={prevPrice}
						addScriptToWatchlist={addScriptToWatchlist}
						removeScriptFromWatchlist={removeScriptFromWatchlist}
						addedToWatchlist={addedToWatchlist}
						totalScriptsAdded={totalScriptsAdded}
					/>
				),
			)}
		</Card>
	);
};

SciptList.propTypes = {
	data: PropTypes.array.isRequired,
	addScriptToWatchlist: PropTypes.func,
	removeScriptFromWatchlist: PropTypes.func,
	totalScriptsAdded: PropTypes.number,
};

export default SciptList;
