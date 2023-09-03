import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQueryParams, StringParam } from 'use-query-params';

const MultipleInputs = () => {
	const [query, setQuery] = useQueryParams({
		airport: StringParam,
		limit: StringParam
	});

	const [airportData, setAirportData] = useState({
		airport: query.airport || 'New York',
		limit: query.limit || '10'
	});

	const [airportResult, setAirportResult] = useState([]);

	// query && console.log(query);
	const handleSelectAirport = (e) => {
		setAirportData((currentAirportData) => ({
			...currentAirportData,
			[e.target.name]: e.target.value
		}));
	};

	// submit airport data
	const handleSubmitAirport = () => {
		// console.log(airportData);
		setQuery(
			{ airport: airportData.airport, limit: airportData.limit },
			'push'
		);
	};

	const getAirportResult = async () => {
		const options = {
			method: 'GET',
			url: `https://aerodatabox.p.rapidapi.com/airports/search/term`,
			params: {
				q: query.airport,
				limit: query.limit
			},
			headers: {
				'X-RapidAPI-Key': 'b5a677c305mshfcf154f560e1c4ap1a8a16jsn8abaa5feada0',
				'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
			}
		};

		const { data } = await axios.request(options);
		console.log(data);
		setAirportResult(data?.items);
	};

	useEffect(() => {
		if (query.airport && query.limit) {
			getAirportResult();
		}
	}, [query.airport]);

	return (
		<>
			<p className="text-2xl mt-12 mb-10">MultipleInputs</p>
			<div>
				<label
					htmlFor="airports"
					className="block mb-2 text-sm font-medium text-gray-900"
				>
					Select an Airport
				</label>
				<select
					id="airports"
					name="airport"
					onChange={handleSelectAirport}
					className="form-select mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
				>
					{/* <option selected>Choose a country</option> */}
					<option value="New York" defaultValue>
						New York
					</option>
					<option value="Seattle">Seattle</option>
				</select>
			</div>
			<br />
			<div>
				<label
					htmlFor="limit"
					className="block mb-2 text-sm font-medium text-gray-900"
				>
					Select limit
				</label>
				<select
					id="limit"
					name="limit"
					onChange={handleSelectAirport}
					className="form-select mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
				>
					<option value={10} type="number" defaultValue>
						10
					</option>
					<option value={20} type="number">
						20
					</option>
				</select>
			</div>
			<br />
			<button
				type="button"
				onClick={handleSubmitAirport}
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			>
				Submit
			</button>
			<br />
			{airportResult?.map(({ name, iata }) => (
				<div key={iata}>
					<p className="text-2xl">{name}</p>
				</div>
			))}
			<br />
			{airportResult?.length > 0 && (
				<button
					type="button"
					className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
					onClick={() => {
						setQuery({ airport: undefined, limit: undefined }, 'replace');
						setAirportResult([]);
					}}
				>
					Clear URL Params
				</button>
			)}
		</>
	);
};

export default MultipleInputs;
