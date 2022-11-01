import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '/styles/Home/Home.module.css'
import Header from '/components/Header';
import MessageBox from '../components/MessageBox';
import { Button, Tabs, Tab, FloatingLabel, Form, SSRProvider } from 'react-bootstrap';
import { highlightList } from '../util/highlightList';

const Home = ({ countries }) => {
    const [highlight, setHighlight] = useState({});
	const [highlightDoc, setHighlightDoc] = useState(null);
	const [gnipercapita, setgnipercapita] = useState(null);
	const [gdpRankings, setGdpRankings] = useState(null);
	const [popRankings, setPopRankings] = useState(null);
	const [search, setSearch] = useState("");
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		setDarkMode(JSON.parse(sessionStorage.getItem("dark_mode")));
		setRandomHighlight();
		fetchData();
    }, [countries]);

	const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	
	const fetchData = async () => {
		const gdpRes = await fetch(`https://api.worldbank.org/v2/country/indicator/NY.GDP.MKTP.CD?date=2021&page=1&format=json&per_page=266`);
		var gdpData = await gdpRes.json();
		gdpData = gdpData[1].slice(49);

		gdpData = gdpData.sort((a, b) => b.value - a.value).slice(0, 50);

		setGdpRankings(gdpData);

		const gniRes = await fetch(`https://api.worldbank.org/v2/country/indicator/NY.GNP.PCAP.CD?date=2021&page=1&format=json&per_page=266`);
		var gniData = await gniRes.json();
		gniData = gniData[1].slice(49);

		gniData = gniData.sort((a, b) => b.value - a.value).slice(0, 50);

		setgnipercapita(gniData);

		const popRes = await fetch(`https://api.worldbank.org/v2/country/indicator/SP.POP.TOTL?date=2021&page=1&format=json&per_page=266`);
		var popData = await popRes.json();
		popData = popData[1].slice(49);

		popData = popData.sort((a, b) => b.value - a.value).slice(0, 50);

		setPopRankings(popData);

		console.log(gdpData);
		console.log(gniData);
		console.log(popData);
	}

	const fetchMoreData = async random => {
		const res = await fetch(`https://us-central1-statsy-417f5.cloudfunctions.net/v1/eco_data?country=${random.name}`);
		const data = await res.json();
		setHighlightDoc(data);
	}

	const setRandomHighlight = () => {
		setHighlightDoc(null);
		const highlightlist = highlightList(countries);

		var random = highlightlist[Math.floor(Math.random() * 32)];
		
		setHighlight(random);
		fetchMoreData(random);
	}

	const redirect = country => {
		if (country == "United Kingdom of Great Britain and Northern Ireland") {
			country = "England"
			window.location = `/${country}`;
		} else if (country == "Russian Federation") {
			country = "Russia"
			window.location = `/${country}`;
		}else {
			window.location = `/${country}`;
		}	
	}

  	return (
		<SSRProvider>
			<div className={darkMode ? `${styles.container} ${styles.darkContainer}` : styles.container}>
				<Head>
					<title>Statsy | Directory of Economies</title>
					<meta name="description" content="Directory of Economies" />
					<link rel="icon" href="/bolt.png" />
				</Head>
				<Header darkModeToggle={() => setDarkMode(!darkMode)}/>
				<MessageBox/>
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
								<h3 style={{fontSize: 18}}><div onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: highlightDoc.gdp ? highlightDoc.gdp.gdp : "N/A" }} /></h3>
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
								popRankings ? 
								<Tabs defaultActiveKey="gdp" id="uncontrolled-tab-example" className="mb-3">
									<Tab eventKey="gdp" title="GDP">
										<h3>GDP rankings 2021</h3>
										<div className={styles.directory}>
											{gdpRankings.map((doc, index) => {
												return (
													<div onClick={() => redirect(doc.country.value)} key={index} className={styles.row}>
														<span style={{flex: 1}}>{index + 1}. {doc.country.value}</span>
														<p>US${numberWithCommas(doc.value)}</p>
													</div>
												)
											})}
										</div>
									</Tab>
									<Tab eventKey="gnipercapita" title="GNI per Capita">
										<h3>GNI per capita rankings</h3>
										<div className={styles.directory}>
											{
												gnipercapita ? gnipercapita.map((doc, index) => {
													return (
														<div onClick={() => redirect(doc.country.value)} key={index} className={styles.row}>
															<span style={{flex: 1}}>{index + 1}. {doc.country.value}</span>
															<p>US${numberWithCommas(doc.value)}</p>
														</div>
													)
												})
												:
												<div style={{display: "flex", justifyContent: "center", marginTop: 100}}>
													<img src="https://cutewallpaper.org/21/loading-gif-transparent-background/Tag-For-Loading-Bar-Gif-Transparent-Loading-Gif-.gif" width={25}/>
												</div>
											}
										</div>
									</Tab>
									<Tab eventKey="population" title="Population">
										<h3>Population rankings 2021</h3>
										<div className={styles.directory}>
											{popRankings.map((doc, index) => {
												return (
													<div onClick={() => redirect(doc.country.value)} key={index} className={styles.row}>
														<span style={{flex: 1}}>{index + 1}. {doc.country.value}</span>
														<p>{doc.value}</p>
													</div>
												)
											})}
										</div>
									</Tab>
								</Tabs>
								:
								<div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
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