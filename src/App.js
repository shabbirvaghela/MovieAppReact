import React, { Component, useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import MoviesList from "./component/MovieList";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Data from "./data/data.json";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			contrastText: "#D4D7DD",
			main: "#00E0FF",
		},
		background: {
			default: "#273244",
			paper: "#1F2A3C",
		},
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					backgroundColor: "#273244",
					backgroundImage: "none",
				},
			},
		},
	},
	typography: {
		fontFamily: ['"Open Sans", sans-serif;'],
		poster: {
			color: "red",
		},
	},
});
const App = () => {
	const [movieList, setMovieList] = useState(Data);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		if (!searchTerm) setMovieList(Data);
		else {
			const lowercasedValue = searchTerm.toString().toLowerCase().trim();
			const filteredMovies = Data.filter((item) => {
				return Object.keys(item).some((key) =>
					item[key].toString().toLowerCase().includes(lowercasedValue)
				);
			});
			setMovieList(filteredMovies);
		}
	}, [searchTerm]);

	return (
		<ThemeProvider theme={darkTheme}>
			<div className="page-wrapper">
				<Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				<Box
					className="main--wrapper"
					component="main"
					sx={{
						flexGrow: 1,
					}}
				>
					<MoviesList movieList={movieList} />
				</Box>
			</div>
		</ThemeProvider>
	);
};

export default App;
