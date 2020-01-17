import React, { useState, useEffect, useRef, useMemo } from "react";
import GridList from "./components/GridList";
import ProductCard from "./components/ProductCard";
import AdCard from "./components/AdCard";
import useFetch from "./hooks/useFetch";
import fetchProductRequest from "../api/products";

export default props => {
	// CONSTANTS

	const chunkSize = 10;
	const initialProducts = [];
	const initialLimit = chunkSize;
	const initialSkeletonLimit = 0;

	// HOOKS

	const { state: fetchProductState, fetch: fetchProducts } = useFetch();
	const [products, setProducts] = useState(initialProducts);
	const [limit, setLimit] = useState(initialLimit);
	const [skeletonLimit, setSkeletonLimit] = useState(initialSkeletonLimit);
	const [sortBy, setSortBy] = useState("price");

	const gridListRef = useRef();

	useEffect(() => {
		setLimit(0);
		setSkeletonLimit(chunkSize);
		handleFetchProducts(true);
	}, [sortBy]);

	useEffect(() => {
		const bottomChecker = setInterval(loadMoreIfBottom, 200);
		const idleChecker = setInterval(loadMoreIfIdle, 5000);
		return () => {
			clearInterval(bottomChecker);
			clearInterval(idleChecker);
		};
	}, [fetchProductState]);

	// FUNCTIONS

	const loadMoreIfBottom = () => {
		if (skeletonLimit > 0) {
			return;
		}
		if (checkIfReachedBottom()) {
			expandVisible();
			handleFetchProducts();
		}
	};

	const loadMoreIfIdle = () => {
		if (skeletonLimit > 0) {
			return;
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
		if (viewPortBottom > listBottom - 200) {
			return true;
		}
		return false;
	};

	const handleFetchProducts = reset => {
		const { waiting } = fetchProductState;
		if (waiting) {
			return;
		}
		fetchProducts(
			fetchProductRequest({
				page: 1,
				limit: chunkSize,
				sort: sortBy
			}),
			handleFetchProductsSuccess(reset)
		);
	};

	const handleFetchProductsSuccess = reset => data => {
		setSkeletonLimit(initialSkeletonLimit);
		reset && setLimit(initialLimit);
		setProducts(reset ? data : products.concat(data));
	};

	const expandVisible = () => {
		if (products.length <= limit) {
			return;
		}
		setLimit(limit + chunkSize);
	};

	const handleSortChange = e => setSortBy(e.currentTarget.value);

	// OTHER VARIABLES

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

	console.log(products.length, limit);

	return (
		<>
			<select value={sortBy} onChange={handleSortChange}>
				<option value="price">price</option>
				<option value="size">size</option>
				<option value="id">id</option>
			</select>
			<GridList
				ref={gridListRef}
				style={{
					minHeight: "40px",
					backgroundColor: "rgb(200,200,200)",
					display: "flex",
					flexWrap: "wrap",
					margin: "0 0 100px 0"
				}}
			>
				<>
					{skeletonProducts.map(product => (
						<span
							key={product}
							style={{
								backgroundColor: "rgb(120, 120, 120)",
								color: "white",
								display: "inline-flex",
								width: "30%",
								height: "300px",
								margin: "5px 1.5%",
								alignItems: "center",
								justifyContent: "center"
							}}
						>
							FACE HERE
						</span>
					))}
					{displayProducts.map(product => (
						<span
							key={Math.random()}
							style={{
								backgroundColor: "rgb(120, 140, 120)",
								color: "white",
								display: "inline-flex",
								width: "30%",
								height: "300px",
								margin: "5px 1.5%",
								alignItems: "center",
								justifyContent: "center"
							}}
						>
							{product.face}
						</span>
					))}
				</>
			</GridList>
		</>
	);
};
