import { useQueryParam, StringParam } from 'use-query-params';
import { useProductsStore } from '../stores/productsStore';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from '@react-hookz/web';
import { productsList } from '../products';

const SearchBar = () => {
	// Accept a single param as String
	const [searchValue, setSearchValue] = useQueryParam('search', StringParam);

	// keep another state for the internal input value
	const [inputValue, setInputValue] = useState(searchValue || '');

	const { filterProducts, products } = useProductsStore();

	// Debounce for Performance for better user experience
	const debounceSetSearchValue = useDebouncedCallback(
		(value) => {
			if (value) {
				setSearchValue(value);
				filterProducts(value, productsList);
			} else {
				setSearchValue(value);
				filterProducts(value, productsList);
			}
		},
		[],
		100,
		300
	);

	// Update input value
	const handleSearchChange = (e) => {
		setInputValue(e.target.value);
	};

	useEffect(() => {
		if (inputValue?.trim() === '' || inputValue === '') {
			// filterProducts(inputValue, productsList);
			debounceSetSearchValue(undefined);

			console.log('no search query');
		} else {
			debounceSetSearchValue(inputValue);
			console.log(`input value: ${inputValue}`);
		}

		// console.log(allProducts);
	}, [inputValue]);

	return (
		<div>
			<input
				type="search"
				className="form-input rounded text-gray-700 text-xl"
				placeholder="Search Product"
				onChange={handleSearchChange}
				value={inputValue}
			/>
			<div className="mt-12">
				{products?.map(({ title, id }) => (
					<div key={id}>
						<p className="text-2xl">{title}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchBar;
