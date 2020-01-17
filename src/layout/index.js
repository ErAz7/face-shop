import React, { useState, useEffect, useRef, useMemo } from "react";
import GridList from "./components/GridList";
import ProductCard from "./components/ProductCard";
import AdCard from "./components/AdCard";
import useFetch from "./hooks/useFetch";
import fetchProductRequest from "../api/products/fetchProducts";
import fetchAdURLRequest from "../api/ads/fetchAdURL";

export default props => {
	// CONSTANTS

	const chunkSize = 16;
	const insertAdEvery = 20;
	const initialLimit = chunkSize;
	const preLoadAdsCount = 5;

	// HOOKS

	const { state: fetchProductState, fetch: fetchProducts } = useFetch();
	const { state: fetchAdsURLState, fetch: fetchAdsURL } = useFetch();
	const [products, setProducts] = useState([]);
	const [ads, setAds] = useState([]);
	const [limit, setLimit] = useState(initialLimit);
	const [skeletonLimit, setSkeletonLimit] = useState(0);
	const [sortBy, setSortBy] = useState("price");
	const [endOfCatalogue, setEndOfCatalogue] = useState(false);

	const gridListRef = useRef();

	useEffect(() => {
		setLimit(0);
		setProducts([]);
		setEndOfCatalogue(false);
		setAds([]);
		setSkeletonLimit(chunkSize);
		handleFetchProducts(true);
		handleFetchAdsURL();
	}, [sortBy]);

	// set two intervals:
	// 	1. 'bottomChecker' to check if user
	// 	reached bottom of list, if so, loads
	// 	loads more items and if items length
	// 	was bigger than 'limit' (visible cards),
	// 	it expands visible view
	// 	2. 'idleChecker' to fetch more items every
	//  5 seconds in order to improve UX, also will
	//  load ads to show every 'insertAdEvery' (20 for now)
	//	item
	// (could listen on window 'scroll' event instead of
	// intervals but it badly affects performance when user
	// scrolls, so intervals are more performant)
	useEffect(() => {
		if (endOfCatalogue) {
			expandVisible();
			return;
		}
		const bottomChecker = setInterval(loadMoreIfBottom, 200);
		const idleChecker = setInterval(loadMoreIfIdle, 5000);
		return () => {
			clearInterval(bottomChecker);
			clearInterval(idleChecker);
		};
	}, [fetchProductState, fetchAdsURLState, endOfCatalogue]);

	// FUNCTIONS

	const loadMoreIfBottom = () => {
		console.log("CHECK BOTTOM");
		if (skeletonLimit > 0) {
			return;
		}
		if (checkIfReachedBottom()) {
			expandVisible();
			handleFetchProducts();
			handleFetchAdsURL();
		}
	};

	const loadMoreIfIdle = () => {
		console.log("CHECK IDLE");
		if (skeletonLimit > 0) {
			return;
		}
		if (ads.length < preLoadAdsCount + limit / insertAdEvery) {
			handleFetchAdsURL();
		}
		handleFetchProducts();
	};

	const checkIfReachedBottom = () => {
		if (!gridListRef.current) {
			return;
		}
		const viewPortBottom = window.pageYOffset + window.innerHeight;
		const listBottom =
			gridListRef.current.offsetHeight + gridListRef.current.offsetTop;
		if (viewPortBottom > listBottom - 10) {
			return true;
		}
		return false;
	};

	const handleFetchProducts = reset => {
		console.log(products.length);
		const { waiting } = fetchProductState;
		if (waiting) {
			return;
		}
		fetchProducts(
			fetchProductRequest({
				page: reset ? 1 : parseInt(products.length / chunkSize) + 1,
				limit: chunkSize,
				sort: sortBy
			}),
			handleFetchProductsSuccess(reset)
		);
	};
	const handleFetchProductsSuccess = reset => response => {
		const { data } = response;
		setSkeletonLimit(0);
		reset && setLimit(initialLimit);
		setProducts(reset ? data : products.concat(data));
		if (data.length < chunkSize) {
			setEndOfCatalogue(true);
		}
	};

	const handleFetchAdsURL = () => {
		const { waiting } = fetchAdsURLState;
		if (waiting) {
			return;
		}
		fetchAdsURL(fetchAdURLRequest(), handleFetchAdsURLSuccess);
	};
	const handleFetchAdsURLSuccess = response => {
		const url = response.request.responseURL;
		// check if new ad URL is the same as last
		// shown ad, if so, ignore this add and load
		// another one
		if (url === ads[ads.length - 1]) {
			handleFetchAdsURL();
			return;
		}
		setAds(ads.concat([url]));
	};

	const expandVisible = () => {
		if (products.length <= limit) {
			return;
		}
		setLimit(limit + chunkSize);
	};

	const handleSortChange = e => setSortBy(e.currentTarget.value);

	// RENDER VARIABLES

	const displayProducts = products.slice(0, limit);

	// create array with 'skeletonLimit' number
	// of cells to create skeleton view before load
	// this could be implemented without memo
	// since the loop will be repeated only 10 times
	const skeletonProducts = useMemo(() => {
		const out = [];
		for (let i = 0; i < skeletonLimit; i++) {
			out.push(i);
		}
		return out;
	}, [skeletonLimit]);

	return (
		<>
			<select value={sortBy} onChange={handleSortChange}>
				<option value="price">price</option>
				<option value="size">size</option>
				<option value="id">id</option>
			</select>
			<GridList ref={gridListRef}>
				<>
					{skeletonProducts.map(product => (
						<ProductCard key={product} skeleton>
							FACE HERE
						</ProductCard>
					))}
					{displayProducts.map((product, index) => {
						const modeAdEvery = (index + 1) % insertAdEvery;
						const adIndex = parseInt(index / insertAdEvery);
						const ad = ads[adIndex];
						return (
							<React.Fragment key={Math.random()}>
								<ProductCard>{product.face}</ProductCard>
								{!modeAdEvery && ad && (
									<AdCard src={ad} alt="adv" />
								)}
							</React.Fragment>
						);
					})}
				</>
			</GridList>
			{endOfCatalogue ? "End Of Catlogue" : "Loading..."}
		</>
	);
};
