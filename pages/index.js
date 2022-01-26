import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '/styles/Home/Home.module.css'
import Header from '/components/Header';
import { Button, Tabs, Tab, FloatingLabel, Form, SSRProvider } from 'react-bootstrap';

const Home = ({ countries }) => {
    const [highlight, setHighlight] = useState({});
	const [highlightDoc, setHighlightDoc] = useState(null);
	const [gdpPerCapita, setGdpPerCapita] = useState(null);
	const [gdpRankings, setGdpRankings] = useState(null);
	const [search, setSearch] = useState("");
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		setDarkMode(JSON.parse(sessionStorage.getItem("dark_mode")));
		setRandomHighlight();
		fetchData();
    }, [countries]);

	const fetchData = async () => {
		const res = await fetch(`https://us-central1-statsy-417f5.cloudfunctions.net/v1/gdp_rankings`);
		const data = await res.json();
		setGdpRankings(data);

		const res2 = await fetch(`https://us-central1-statsy-417f5.cloudfunctions.net/v1/gdp_per_capita_rankings`);
		const data2 = await res2.json();
		setGdpPerCapita(data2);
	}

	const fetchMoreData = async random => {
		const res = await fetch(`https://us-central1-statsy-417f5.cloudfunctions.net/v1/eco_data?country=${random.name}`);
		const data = await res.json();
		setHighlightDoc(data);
	}

	const setRandomHighlight = () => {
		setHighlightDoc(null);
		var random = countries[Math.floor(Math.random() * 250)];
		
		if (random.name.length > 15) {
			random = countries[Math.floor(Math.random() * 250)];
		}
		
		setHighlight(random);
		fetchMoreData(random);
	}

	const redirect = country => window.location = `/${country}`;

  	return (
		<SSRProvider>
			<div className={darkMode ? `${styles.container} ${styles.darkContainer}` : styles.container}>
				<Head>
					<title>Statsy | Directory of Economies</title>
					<meta name="description" content="Directory of Economies" />
					<link rel="icon" href="/bolt.png" />
				</Head>
				<Header darkModeToggle={() => setDarkMode(!darkMode)}/>
				<br/>
				<div className={styles.wrapper}>
					<h3>Highlight Economy <Button onClick={setRandomHighlight} style={{borderRadius: 3, marginLeft: 10}} variant="primary">Refresh</Button></h3>
					<div onClick={() => redirect(highlight.name)} className={styles.highlight}>
						<div>
							<div className={styles.line}></div>
							<h2 style={{fontWeight: "bold"}}>{highlight.name} <img src={highlight.flag} width={50}/></h2>
							<span style={darkMode ? {color: "white", fontSize: 16} : {color: "grey", fontSize: 16}}>{highlight.region}</span>
						</div>
						{
						highlightDoc ? 
							<div>
								<span style={darkMode ? {color: "white", fontSize: 14} : {color: "grey", fontSize: 14}}>Capital</span>
								<h3 style={{fontSize: 18}}>{highlight.capital}</h3>
								<br/>
								<span style={darkMode ? {color: "white", fontSize: 14} : {color: "grey", fontSize: 14}}>Economic group(s)</span>
								<div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: highlightDoc.profile ? highlightDoc.profile.country_group : "N/A" }} />
								<br/>
								<span style={darkMode ? {color: "white", fontSize: 14} : {color: "grey", fontSize: 14}}>GDP</span>
								<h3 style={{fontSize: 18}}><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: highlightDoc.gdp.gdp }} /></h3>
							</div>
						: 
							<div className={styles.loaderContainer}>
								<img src="https://cutewallpaper.org/21/loading-gif-transparent-background/Tag-For-Loading-Bar-Gif-Transparent-Loading-Gif-.gif" width={25}/>
							</div>
						}
					</div>
					<div className={styles.inner}>
						<div className={styles.list}>
							<h3>Directory</h3>
							<FloatingLabel style={darkMode ? {color: "rgb(170, 170, 170)"} : {}} controlId="floatingSearch" label="Search">
								<Form.Control style={darkMode ? {backgroundColor: "rgb(23, 23, 31)", color: "white", borderColor: "rgb(170, 170, 170)"} : {}} value={search} onChange={e => setSearch(e.target.value.toLowerCase())} type="search" placeholder="Search" />
							</FloatingLabel>
							<div className={styles.directory}>
								{countries.filter(doc => doc.name.toLowerCase().includes(search)).map((doc, index) => {
									return (
										<div onClick={() => redirect(doc.name)} key={index} className={styles.row}>
											<div><img src={doc.flag} width={30}/> <strong style={{marginLeft: 10}}>{doc.name}</strong></div> 
											<span style={{color: "grey", fontSize: 12}}>{doc.region}</span>
										</div>
									)
								})}
							</div>
						</div>
						<div className={styles.rankings}>
							{
								gdpRankings ? 
								<Tabs defaultActiveKey="gdp" id="uncontrolled-tab-example" className="mb-3">
									<Tab eventKey="gdp" title="GDP">
										<h3>GDP rankings {gdpRankings[0].year} (US$ million) </h3>
										<div className={styles.directory}>
											{gdpRankings.map((doc, index) => {
												return (
													<div key={index} className={styles.row}>
														{index + 1}
														<div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: doc.country }} />
														<span style={{fontSize: 12}}><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: doc.estimate }} /></span>
														<span>{doc.region}</span>
													</div>
												)
											})}
										</div>
									</Tab>
									<Tab eventKey="gdppercapita" title="GDP per Capita">
										<h3>GDP per capita rankings (US$) </h3>
										<div className={styles.directory}>
											{
												gdpPerCapita ? gdpPerCapita.map((doc, index) => {
													return (
														<div key={index} className={styles.row}>
															{index + 1}
															<div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: doc.country.replace("*", "") }} />
															<span style={{fontSize: 12}}>{doc.estimate}</span>
															<span><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: doc.region }} /></span>
														</div>
													)
												})
												:
												<div style={{display: "flex", justifyContent: "center"}}>
													<img src="https://cutewallpaper.org/21/loading-gif-transparent-background/Tag-For-Loading-Bar-Gif-Transparent-Loading-Gif-.gif" width={25}/>
												</div>
											}
										</div>
									</Tab>
								</Tabs>
								:
								<div style={{display: "flex", justifyContent: "center"}}>
									<img src="https://cutewallpaper.org/21/loading-gif-transparent-background/Tag-For-Loading-Bar-Gif-Transparent-Loading-Gif-.gif" width={25}/>
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		</SSRProvider>
	)
}

export default Home;

export async function getStaticProps() {
	const res = await fetch(`https://restcountries.com/v2/all`);
    const countries = await res.json();

    if (!countries) {
        return {
            notFound: true,
        }
    }
  
    return {
        props: {
            countries
        }
    }
}