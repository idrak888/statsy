import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '/styles/EcoData/EcoData.module.css'
import Header from '/components/Header';

const Info = () => {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		setDarkMode(JSON.parse(sessionStorage.getItem("dark_mode")));
    }, []);

  	return (
		<div className={darkMode ? `${styles.container} ${styles.darkContainer}` : styles.container}>
			<Header darkModeToggle={() => setDarkMode(!darkMode)}/>
			<Head>
				<title>API Information | Directory of Economies</title>
				<meta name="description" content="Directory of Economies" />
				<link rel="icon" href="/bolt.png" />
			</Head>
			<div style={{height: "100vh"}} className={styles.wrapper}>
				<div style={darkMode ? {backgroundColor: "rgb(32, 32, 39)"} : {backgroundColor: "rgb(239, 246, 255)"}}>
					<h2>API Information</h2>
					<br/>
					<p style={{fontWeight: "bold"}}>For country directory and general use:</p>
					<a href="https://restcountries.com/">https://restcountries.com/</a>
					<br/>

					<br/>
					<p style={{fontWeight: "bold"}}>Country-specific economic data:</p>
					<p><em>Data scraped from: </em></p>
					<a href="https://en.wikipedia.org/wiki/Economy_of_Canada">Wikipedia Economies series</a>
					<br/>

					<br/>
					<p style={{fontWeight: "bold"}}>GDP/GDP per capita ranks:</p>
					<p><em>Data scraped from: </em></p>
					<a href="https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)">Wikipedia List of countries by GDP (nominal)</a>
					<br/>
					<a href="https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)_per_capita">Wikipedia List of countries by GDP (nominal) per capita</a>
				</div>
			</div>
		</div>
	)
}

export default Info;