import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '/styles/EcoData/EcoData.module.css'
import Header from '/components/Header';

const Info = () => {
	const [darkMode, setDarkMode] = useState(false);

  	return (
		<div className={darkMode ? `${styles.container} ${styles.darkContainer}` : styles.container}>
			<Header darkModeToggle={() => setDarkMode(!darkMode)}/>

			<div className={styles.wrapper}>
				<div style={darkMode ? {backgroundColor: "rgb(32, 32, 39)"} : {backgroundColor: "rgb(239, 246, 255)"}}>
					<h2>API Information</h2>
					<p>Still working on it</p>
				</div>
			</div>
		</div>
	)
}

export default Info;