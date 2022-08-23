import React, { Fragment, useState } from 'react';
import Progress from './Progress';
import axios from 'axios';

const FileUpload = () => {
	const [file, setFile] = useState('');
	const [fileName, setFilename] = useState('Choose file');
	const [uploadPercentage, setUploadPercentage] = useState(0);

	const onChange = e => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};

	const onSubmit = async e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('library', file);

		try {
			const res = await axios.post('/api/v1/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: progressEvent => {
					const total = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					console.log(`progressEvent.total ${total}`);
					setUploadPercentage(
						parseInt(
							Math.round((progressEvent.loaded * 100) / progressEvent.total)
						)
					);

					setTimeout(() => setUploadPercentage(0), 10000);
				},
			});
		} catch (err) {
			if (err.response.status === 500) {
				console.log('there was a problem with the server');
			} else {
				console.log(err.response.data.msg);
			}
		}
	};

	return (
		<Fragment>
			<form onSubmit={onSubmit}>
				<div className='custom-file mb-4'>
					<input
						type='file'
						className='custom-file-input'
						id='customFile'
						onChange={onChange}
					/>
				</div>
				<Progress percentage={uploadPercentage} />
				<input
					type='submit'
					value='Upload'
					className='btn btn-primary btn-block mt-4'
				/>
			</form>
		</Fragment>
	);
};

export default FileUpload;
