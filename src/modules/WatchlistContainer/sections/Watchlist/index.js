import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Card,
	PageHeader,
	Empty,
	Button,
	Modal,
	Space,
	Form,
	Input,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';

import ScriptList from '../ScriptList';
import styles from './index.module.scss';

const Watchlist = ({
	title,
	scripts,
	updateWatchlistName,
	removeScriptFromWatchlist,
	totalScriptsAdded,
}) => {
	const [modalForm] = Form.useForm();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleSubmit = () => {
		modalForm.validateFields().then(() => {
			updateWatchlistName(modalForm.getFieldValue('title'));
			setIsModalVisible(false);
		});
	};

	return (
		<div className={styles.watchlist}>
			<Card
				bodyStyle={{
					padding: 0,
					display: 'flex',
					alignItems: 'center',
				}}
				className={styles.itemBody}
			>
				<PageHeader
					className={styles.header}
					title={
						<div className={styles.title}>
							<div className={styles.titleText}>{title}</div>
						</div>
					}
					extra={
						<Button onClick={() => setIsModalVisible(true)}>
							<EditOutlined />
						</Button>
					}
				/>
			</Card>
			{scripts.length > 0 ? (
				<ScriptList
					data={scripts}
					removeScriptFromWatchlist={removeScriptFromWatchlist}
					totalScriptsAdded={totalScriptsAdded}
				/>
			) : (
				<Empty className={styles.empty}></Empty>
			)}
			<Modal
				closable
				title="Edit Watchlist Name"
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				width={280}
				centered
				destroyOnClose
				footer={[
					<Space style={{ margin: '5px 10px 5px 0px' }} key="buttons">
						<Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
						<Button
							type="primary"
							onClick={() => {
								handleSubmit();
							}}
						>
							OK
						</Button>
					</Space>,
				]}
			>
				<Form form={modalForm} initialValues={{ title }} layout="vertical">
					<Form.Item
						label="New Title:"
						name="title"
						rules={[
							{ required: true, message: 'Title cannot be empty' },
							{
								pattern: "^[a-zA-Z0-9- _']*$",
								message: 'Use Alphanumeric values',
							},
						]}
					>
						<Input placeholder="Enter watchlist title" />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

Watchlist.propTypes = {
	title: PropTypes.string.isRequired,
	scripts: PropTypes.array.isRequired,
	updateWatchlistName: PropTypes.func.isRequired,
	removeScriptFromWatchlist: PropTypes.func.isRequired,
	totalScriptsAdded: PropTypes.number,
};

export default Watchlist;
