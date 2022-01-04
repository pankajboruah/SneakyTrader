import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

const Search = ({ form, updateQuery, isLoading, totalScriptsAdded = 0 }) => {
	const onFormValueChange = (formData) => {
		if ('script' in formData) {
			updateQuery(formData.script);
		}
	};

	return (
		<div style={{ paddingTop: 24 }}>
			<Form
				form={form}
				layout="vertical"
				className={styles.form}
				onValuesChange={onFormValueChange}
			>
				<Form.Item
					name="script"
					rules={[
						{
							pattern: "^[a-zA-Z0-9- ']*$",
							message: 'Invalid character entered',
						},
					]}
				>
					<Input
						allowClear
						size="large"
						placeholder="Search eg: infy bse, nifty fut weekly, gold mcx"
						prefix={<SearchOutlined style={{ color: '#cecece' }} />}
						suffix={
							<span style={{ color: '#cecece' }}>{totalScriptsAdded ?? 0}/50</span>
						}
						disabled={isLoading}
					/>
				</Form.Item>
			</Form>
			<Divider style={{ marginBottom: 0 }} />
		</div>
	);
};

Search.propTypes = {
	form: PropTypes.object.isRequired,
	updateQuery: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	totalScriptsAdded: PropTypes.number,
};

export default Search;
