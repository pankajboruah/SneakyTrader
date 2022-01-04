import React, { useState } from 'react';
import { Card, Form } from 'antd';
import debounce from 'lodash/debounce';

import { getFilteredStocks } from 'apis/stockData';

import Search from './sections/Search';
import SciptList from './sections/ScriptList';
import Watchlist from './sections/Watchlist';
import Footer from './sections/Footer';

import styles from './index.module.scss';

const watchlistMeta = [
	{ title: 'Watchlist 1', key: '1', scripts: [], closable: false },
];

const WatchlistContainer = () => {
	const [form] = Form.useForm();
	const [activeKey, setActiveKey] = useState(`${watchlistMeta[0].key}-0`);
	const [searchData, setSearchData] = useState([]);
	const [showSearchResults, setShowSearchResults] = useState(false);
	const [watchlists, setWatchlists] = useState(watchlistMeta);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const filterStocks = (query) => {
		if (query.length === 0) {
			resetSearchResults();
			return;
		}
		setIsLoading(true);
		getFilteredStocks(query, 1, 25)
			.then((res) => {
				setShowSearchResults(true);
				setSearchData(
					res.map(({ name, currentPrice, prevPrice }) => {
						const [scriptName, exchange] = name.split('::');
						const addedToWatchlist =
							watchlists[activeIndex].scripts.findIndex(
								({ name }) => name === scriptName,
							) > -1;
						return {
							name: scriptName,
							exchange,
							currentPrice,
							prevPrice,
							addedToWatchlist,
						};
					}),
				);
			})
			.catch((err) => console.error(err))
			.finally(() => setIsLoading(false));
	};

	const resetSearchResults = () => {
		form.setFieldsValue({ script: '' });
		setShowSearchResults(false);
		setSearchData([]);
	};

	const debouncedSearchScripts = debounce((value) => {
		filterStocks(value);
	}, 500);

	const addScriptToWatchlist = (script) => {
		let res = [...watchlists];
		let newSearchData = [...searchData];
		res[activeIndex].scripts.push(script);
		for (let i = 0; i < newSearchData.length; i++) {
			if (newSearchData[i].name === script.name) {
				newSearchData[i].addedToWatchlist = true;
				break;
			}
		}
		setSearchData(newSearchData);
		setWatchlists(res);
	};

	const removeScriptFromWatchlist = (scriptName) => {
		let res = [...watchlists];
		let newSearchData = [...searchData];
		let temp = res[activeIndex].scripts.filter(({ name }) => name !== scriptName);
		res[activeIndex].scripts = [...temp];
		for (let i = 0; i < newSearchData.length; i++) {
			if (newSearchData[i].name === scriptName) {
				newSearchData[i].addedToWatchlist = false;
				break;
			}
		}
		setSearchData(newSearchData);
		setWatchlists(res);
	};

	const updateWatchlistName = (newTitle) => {
		let res = [...watchlists];
		res[activeIndex].title = newTitle;
		setWatchlists(res);
	};

	return (
		<Card title="Sneaky Trader" className={styles.container}>
			<Search
				form={form}
				reset={resetSearchResults}
				updateQuery={debouncedSearchScripts}
				totalScriptsAdded={watchlists[activeIndex]?.scripts?.length}
				isLoading={isLoading}
			/>
			{showSearchResults ? (
				<SciptList
					data={searchData}
					addScriptToWatchlist={addScriptToWatchlist}
					removeScriptFromWatchlist={removeScriptFromWatchlist}
					totalScriptsAdded={watchlists[activeIndex]?.scripts?.length}
				/>
			) : (
				<Watchlist
					title={watchlists[activeIndex].title}
					scripts={Array.from(watchlists[activeIndex].scripts)}
					removeScriptFromWatchlist={removeScriptFromWatchlist}
					totalScriptsAdded={watchlists[activeIndex]?.scripts?.length}
					updateWatchlistName={updateWatchlistName}
				/>
			)}
			<Footer
				activeKey={activeKey}
				setActiveKey={setActiveKey}
				watchlists={watchlists}
				setWatchlists={setWatchlists}
				setActiveIndex={setActiveIndex}
				resetSearchResults={resetSearchResults}
			/>
		</Card>
	);
};

export default WatchlistContainer;
