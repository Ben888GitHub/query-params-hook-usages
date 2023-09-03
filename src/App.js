import './App.css';
import SearchBar from './component/SearchBar';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import queryString from 'query-string';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<QueryParamProvider
					adapter={ReactRouter6Adapter}
					// options={{
					// 	searchStringToObject: queryString.parse,
					// 	objectToSearchString: queryString.stringify
					// }}
				>
					<p className="text-3xl mt-12 mb-10">Use Query Params</p>
					<SearchBar />
					{/* <Routes>
						<Route path="/" element={<SearchBar />} />
					</Routes> */}
				</QueryParamProvider>
			</div>
		</BrowserRouter>
	);
}

export default App;
