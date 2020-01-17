import React, { useState, useEffect, useRef } from "react";
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

	// HOOKS

	const { state: fetchProductState, fetch: fetchProducts } = useFetch();
	const [products, setProducts] = useState(initialProducts);
	const [limit, setLimit] = useState(initialLimit);
	const [sortBy, setSortBy] = useState("price");

	const gridListRef = useRef();

	useEffect(() => {
		const bottomChecker = setInterval(loadMoreIfBottom, 500);
		const idleChecker = setInterval(loadMoreIfIdle, 5000);
		return () => {
			clearInterval(bottomChecker);
			clearInterval(idleChecker);
		};
	}, [fetchProductState]);

	// FUNCTIONS

	const loadMoreIfBottom = () => {
		if (checkIfReachedBottom()) {
			expandVisible();
			handleFetchProducts();
		}
	};

	const loadMoreIfIdle = () => {
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

	const handleFetchProducts = () => {
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
			handleFetchProductsSuccess
		);
	};

	const handleFetchProductsSuccess = data => {
		setProducts(products.concat(data));
	};

	const expandVisible = () => {
		if (products.length <= limit) {
			return;
		}
		setLimit(limit + chunkSize);
	};

	const resetVisible = () => {
		setProducts(initialProducts);
		setLimit(initialLimit);
	};

	const handleSortChange = e => {
		const sortValue = e.currentTarget.value;
		setSortBy(sortValue);
		resetVisible();
	};

	// OTHER VARIABLES

	const displayProducts = products.slice(0, limit);

	return (
		<>
			<select value={sortBy} onChange={handleSortChange}>
				<option value="price">price</option>
				<option value="size">size</option>
				<option value="id">id</option>
			</select>
			<GridList
				onClick={handleFetchProducts}
				ref={gridListRef}
				style={{
					minHeight: "40px",
					backgroundColor: "rgb(200,200,200)",
					display: "flex",
					flexWrap: "wrap",
					margin: "0 0 100px 0"
				}}
			>
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
			</GridList>
		</>
	);
};
