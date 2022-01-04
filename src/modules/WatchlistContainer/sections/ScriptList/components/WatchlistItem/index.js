import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Card, Button, PageHeader, Row } from 'antd';
import {
	CaretUpOutlined,
	CaretDownOutlined,
	PlusOutlined,
	DeleteOutlined,
} from '@ant-design/icons';

import styles from './index.module.scss';

const WatchlistItem = ({
	name,
	exchange,
	currentPrice,
	prevPrice,
	totalScriptsAdded,
	addedToWatchlist,
	addScriptToWatchlist,
	removeScriptFromWatchlist,
}) => {
	const handleAddClick = () => {
		let payload = {
			name,
			exchange,
			currentPrice,
			prevPrice,
			addedToWatchlist: true,
		};
		addScriptToWatchlist(payload);
	};

	const handleDeleteClick = () => {
		removeScriptFromWatchlist(name);
	};

	return (
		<div className={styles.watchListItem}>
			<Card
				bodyStyle={{
					padding: 0,
					display: 'flex',
					alignItems: 'center',
				}}
				className={styles.ItemBody}
			>
				<PageHeader
					className={styles.header}
					title={
						<>
							<div className={styles.title}>
								<div
									className={cx(styles.titleText, {
										[styles.green]: currentPrice > prevPrice,
										[styles.red]: currentPrice < prevPrice,
									})}
								>
									{name}
								</div>
							</div>
							<Row>
								<div className={styles.subtitle}>
									<span>{exchange}</span>
								</div>
							</Row>
						</>
					}
					extra={
						<>
							<div className={styles.priceDescription}>
								<div
									className={cx(styles.currentPrice, {
										[styles.green]: currentPrice > prevPrice,
										[styles.red]: currentPrice < prevPrice,
									})}
								>
									{currentPrice.toFixed(2)}
								</div>
							</div>
							<Row>
								<div className={styles.percentage}>
									{currentPrice === prevPrice ? null : currentPrice > prevPrice ? (
										<CaretUpOutlined className={styles.green} />
									) : (
										<CaretDownOutlined className={styles.red} />
									)}
									<span>{((currentPrice - prevPrice) / prevPrice).toFixed(2)} %</span>
								</div>
							</Row>
						</>
					}
				/>
				<div className={styles.actions}>
					{addedToWatchlist ? (
						<Button
							className={cx(styles.button, styles.red)}
							onClick={() => handleDeleteClick()}
						>
							<DeleteOutlined className={styles.red} />
						</Button>
					) : (
						<Button
							className={cx(styles.button, styles.green, {
								[styles.disabled]: totalScriptsAdded === 50,
							})}
							onClick={() => handleAddClick()}
							disabled={totalScriptsAdded === 50}
						>
							<PlusOutlined />
						</Button>
					)}
				</div>
			</Card>
		</div>
	);
};

WatchlistItem.propTypes = {
	name: PropTypes.string,
	exchange: PropTypes.string,
	currentPrice: PropTypes.number,
	prevPrice: PropTypes.number,
	totalScriptsAdded: PropTypes.number,
	addedToWatchlist: PropTypes.bool,
	addScriptToWatchlist: PropTypes.func,
	removeScriptFromWatchlist: PropTypes.func,
};

export default WatchlistItem;
