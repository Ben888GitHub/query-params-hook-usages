import { create } from 'zustand';

export const useProductsStore = create((set, get) => ({
	allProducts: [], // all products
	products: [], // currently filtered products based on query params url
	setProducts: (products) => set({ products }), // insert filtered products
	setAllProducts: (allProducts) => set({ allProducts }), // insert all products
	filterProducts: (title, allProducts) => {
		const productTitle = title?.toLowerCase().trim(); // from search query

		//  if no search query is filtered
		if (!productTitle || productTitle.trim() === '' || title === '') {
			console.log(allProducts);
			return set({ products: allProducts });
		}

		// title && console.log(productTitle);
		// else filter products
		const filteredProducts = allProducts?.filter((product) => {
			return product?.title.toLowerCase().includes(productTitle);
		});
		// console.log(`Filtered: ${filteredProducts}`);

		return set({ products: filteredProducts });
	}
}));
