import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '/styles/EcoData/EcoData.module.css'
import Header from '/components/Header';
import { SSRProvider, Button } from 'react-bootstrap';

const EcoData = ({ country, countryData }) => {
    const [data, setData] = useState(null);
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		setDarkMode(JSON.parse(sessionStorage.getItem("dark_mode")));
		fetchData().then(() => {
			console.log(data);
		});
    }, [country]);

	const fetchData = async () => {
		const res = await fetch(`https://us-central1-statsy-417f5.cloudfunctions.net/v1/eco_data?country=${country}`);
    	const data = await res.json();
		setData(data);
	}

  	return (
		<SSRProvider>
			<div className={darkMode ? `${styles.container} ${styles.darkContainer}` : styles.container}>
				<Head>
					<title>{countryData[0].name.common == "Macau" && country == "China" ? "China" : countryData[0].name.common} | Directory of Economies</title>
					<meta name="description" content="Directory of Economies" />
					<link rel="icon" href="/bolt.png" />
				</Head>
				<Header darkModeToggle={() => setDarkMode(!darkMode)}/>
				<br/>
				{
					data ? 
					<div>
						<div className={styles.wrapper}>
							<div>
								<h3><Button onClick={() => window.location = "/"} style={{borderRadius: 3, fontSize: 12, marginRight: 10, marginLeft: 10}} variant="primary">Back</Button> Economy of {countryData[0].name.common == "Macau" && country == "China" ? countryData[1].name.common : countryData[0].name.common} {countryData[0].name.common == "Macau" && country == "China" ? countryData[1].flag : countryData[0].flag}</h3>
								<div className={styles.banner}>
									<img src={data.profile.cover_image} style={{flex: 1, height: '100%'}}/>
									<iframe
										style={{flex: 1, border: 0, height: '100%'}}
										loading="lazy"
										allowFullScreen={false}
										src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD__Krjk05sSt3-xK4_Uez3s_m_8ZXzJ4Q&q=${countryData[0].name.common}`}>
									</iframe>
								</div>
								<div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.profile.caption }} />
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.profile.country_group }} /></h4>
								<div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.profile.description }} />

								<label>Population</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.profile.population }} /></h4>
							</div>
						</div>
						<div className={styles.wrapper}>
							<div style={darkMode ? {backgroundColor: "rgb(32, 32, 39)"} : {backgroundColor: "rgb(239, 246, 255)"}}>
								<label>Main industries</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.general.main_industries }} /></h4>
								<label>HDI</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.general.HDI }} /></h4>
								<label>Gini coefficient</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.general.gini_coefficient }} /></h4>
								<label>Unemployment</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.general.unemployment }} /></h4>
							</div>
							<div style={darkMode ? {backgroundColor: "rgb(32, 32, 39)"} : {backgroundColor: "rgb(239, 246, 255)"}}>
								<label>GDP</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.gdp.gdp }} /></h4>
								<label>GDP growth</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.gdp.gdp_growth }} /></h4>
								<label>GDP per capita</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.gdp.gdp_per_capita }} /></h4>
								<label>GDP by sector</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.gdp.gdp_by_sector }} /></h4>
								<label>GDP rank (nominal)</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.gdp.gdp_rank }} /></h4>
							</div>
							<div style={darkMode ? {backgroundColor: "rgb(32, 32, 39)"} : {backgroundColor: "rgb(239, 246, 255)"}}>
								<label>Exports</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.trade.exports }} /></h4>
								<label>Export goods</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.trade.export_goods }} /></h4>
								<label>Export partners</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.trade.export_partners }} /></h4>
								<label>Imports</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.trade.imports }} /></h4>
								<label>Import goods</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.trade.import_goods }} /></h4>
								<label>Import partners</label>
								<h4><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.trade.import_partners }} /></h4>
							</div>
						</div>
					</div>
					: 
					<div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "90vh"}}>
						<img src="https://cutewallpaper.org/21/loading-gif-transparent-background/Tag-For-Loading-Bar-Gif-Transparent-Loading-Gif-.gif" width={25}/>
					</div>
				}
			</div>
		</SSRProvider>
	)
}

export default EcoData;

export async function getServerSideProps({query}) {
    const { country } = query;
	
	const res2 = await fetch(`https://restcountries.com/v3.1/name/${country}`);
	const countryData = await res2.json();

    return {
        props: {
			country,
            countryData
        }
    }
}