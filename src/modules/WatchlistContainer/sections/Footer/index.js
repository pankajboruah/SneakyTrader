import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import styles from './index.module.scss';
const { TabPane } = Tabs;

const Footer = ({
	activeKey,
	setActiveKey,
	watchlists,
	setWatchlists,
	setActiveIndex,
	resetSearchResults,
}) => {
	const onChange = (activeKey) => {
		const [, index] = activeKey.split('-');
		setActiveKey(activeKey);
		setActiveIndex(Number.parseInt(index, 10));
		resetSearchResults();
	};

	const onEdit = (targetKey, action) => {
		if (action === 'add') {
			add();
		} else if (action === 'remove') {
			remove(targetKey);
		}
	};

	const add = () => {
		const activeKey = `${
			+watchlists[watchlists.length - 1].key.split('-')[0] + 1
		}`;
		const newWatchlists = [...watchlists];
		newWatchlists.push({
			title: `Watchlist ${activeKey}`,
			key: activeKey,
			scripts: [],
		});
		onChange(`${activeKey}-${watchlists.length}`);
		setWatchlists(newWatchlists);
	};

	const remove = (targetKey) => {
		const [removedKey] = targetKey.split('-');
		let [newActiveKey, index] = activeKey.split('-');
		let lastIndex;
		watchlists.forEach((watchlist, i) => {
			if (watchlist.key === removedKey) {
				lastIndex = i - 1;
			}
		});
		const newWatchlists = watchlists.filter(
			(watchlist) => watchlist.key !== removedKey,
		);
		if (newWatchlists.length && newActiveKey === removedKey) {
			if (lastIndex >= 0) {
				newActiveKey = newWatchlists[lastIndex].key;
				index = lastIndex;
			} else {
				newActiveKey = newWatchlists[0].key;
				index = 0;
			}
		} else {
			index--;
		}
		onChange(`${newActiveKey}-${index}`);
		setWatchlists(newWatchlists);
	};

	return (
		<Tabs
			type="editable-card"
			onChange={onChange}
			onEdit={onEdit}
			activeKey={activeKey}
			tabPosition="bottom"
			tabBarStyle={{ margin: 0 }}
			hideAdd={watchlists.length === 5}
			className={styles.tabContainer}
			tabBarExtraContent={{
				right: <div className={styles.tabCount}>{watchlists.length} out of 5</div>,
			}}
		>
			{watchlists.map((watchlist, idx) => (
				<TabPane
					tab={`${idx + 1}`}
					key={`${watchlist.key}-${idx}`}
					closable={watchlist.closable}
				></TabPane>
			))}
		</Tabs>
	);
};

Footer.propTypes = {
	activeKey: PropTypes.string.isRequired,
	watchlists: PropTypes.array.isRequired,
	setActiveKey: PropTypes.func.isRequired,
	setWatchlists: PropTypes.func.isRequired,
	setActiveIndex: PropTypes.func.isRequired,
	resetSearchResults: PropTypes.func.isRequired,
};

export default Footer;
