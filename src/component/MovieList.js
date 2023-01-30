import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import ProgressBox from "../component/ProgressBox";
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Collapse,
	Typography,
} from "@mui/material";
import { AddCircleOutline, PlayCircleOutline } from "@mui/icons-material";
import PropTypes from "prop-types";

const MovieList = ({ movieList }) => {
	const [selectedMovieImdbID, setSelectedMovieImdbID] = useState(null);
	const [columnPerRow, setcolumnPerRow] = useState(5);
	const [SelectedMovieExpanded, setSelectedMovieExpanded] = useState(false);
	const [SelectedMovieCardIndex, setSelectedMovieCardIndex] = useState(null);
	const [cardAnimation, setCardAnimation] = useState(false);
	const selectedMovieData = selectedMovieImdbID
		? movieList.find(({ imdbID }) => imdbID === selectedMovieImdbID)
		: null;
	const scrollToExpandedMovieCard = useRef(null);
	useEffect(() => {
		let pageColumn = 5;
		let screenWidth = window.innerWidth;
		if (screenWidth > 1535) pageColumn = 5;
		else if (screenWidth > 1199) pageColumn = 4;
		else if (screenWidth > 899) pageColumn = 3;
		else pageColumn = 2;
		setcolumnPerRow(pageColumn);
		console.log(pageColumn);
	}, []);

	return (
		<>
			<Grid container spacing={{ xs: 2, sm: 3.25 }}>
				{movieList.map((movie, index) => (
					<React.Fragment key={movie.imdbID}>
						{parseInt(SelectedMovieCardIndex / columnPerRow) * columnPerRow ===
							index && (
							<Grid
								ref={scrollToExpandedMovieCard}
								item
								data-index={index}
								xs={12}
								className={
									cardAnimation
										? "card--details-wrapper animation--in"
										: "card--details-wrapper"
								}
							>
								<Collapse
									in={SelectedMovieExpanded}
									timeout="auto"
									unmountOnExit
								>
									{selectedMovieImdbID ? (
										<Card className="card--wrapper">
											<CardMedia
												className="card--image"
												component="img"
												image={selectedMovieData.Poster}
												alt="green iguana"
											/>
											<CardContent className="card--content">
												<h2 className="card--title">
													{selectedMovieData.Title}
												</h2>
												<div className="progress--box">
													<ProgressBox
														rating={selectedMovieData.imdbRating}
													></ProgressBox>
												</div>
												<Grid container className="movie--detail-wrapper">
													<Grid item className="movie--detail-label">
														<p className="movie--detail-text">Year:</p>
													</Grid>
													<Grid item className="movie--detail-data">
														<p className="movie--detail-text">
															{selectedMovieData.Year}
														</p>
													</Grid>
													<div className="w-100"></div>
													<Grid item className="movie--detail-label">
														<p className="movie--detail-text">Runnig Time:</p>
													</Grid>
													<Grid item className="movie--detail-data">
														<p className="movie--detail-text">
															{selectedMovieData.Runtime}
														</p>
													</Grid>
													<div className="w-100"></div>
													<Grid item className="movie--detail-label">
														<p className="movie--detail-text">Directed by:</p>
													</Grid>
													<Grid item className="movie--detail-data">
														<p className="movie--detail-text">
															{selectedMovieData.Director}
														</p>
													</Grid>
													<div className="w-100"></div>
													<Grid item className="movie--detail-label">
														<p className="movie--detail-text">Language:</p>
													</Grid>
													<Grid item className="movie--detail-data">
														<p className="movie--detail-text">
															{selectedMovieData.Language}
														</p>
													</Grid>
													<div className="w-100"></div>
													<Grid item xs={12}>
														<p className="movie--detail-text plot--text">
															{selectedMovieData.Plot}
														</p>
													</Grid>
												</Grid>
												<div className="button--wrapper">
													<Button
														variant="contained"
														color="primary"
														sx={{ mr: 2 }}
													>
														Play Movie
													</Button>
													<Button variant="outlined">Watch Later</Button>
												</div>
											</CardContent>
										</Card>
									) : null}
								</Collapse>
							</Grid>
						)}
						<Grid
							xs={6}
							md={4}
							lg={3}
							xl={2.4}
							item
							className="movie--card-wrapper"
						>
							<CardActionArea
								data-index={index}
								className={
									movie.imdbID === selectedMovieImdbID ? "active--card" : null
								}
								onClick={() => {
									if (selectedMovieImdbID === movie.imdbID) {
										setSelectedMovieExpanded(false);
										setCardAnimation(false);
										setTimeout(() => {
											setSelectedMovieImdbID(null);
											setSelectedMovieCardIndex(null);
										}, 400);
									} else {
										setSelectedMovieImdbID(movie.imdbID);
										setSelectedMovieExpanded(true);
										setCardAnimation(false);
										setSelectedMovieCardIndex(index);
										setTimeout(() => {
											setCardAnimation(true);
											scrollToExpandedMovieCard.current.scrollIntoView();
										}, 100);
									}
								}}
							>
								<Card className="card--wrapper movie--card">
									<CardMedia
										className="card--image"
										component="img"
										image={movie.Poster}
										alt="green iguana"
									/>
									<CardContent className="card--content">
										<Typography
											gutterBottom
											className="card--title"
											component="div"
										>
											{movie.Title}
										</Typography>
										<CardActions sx={{ p: 0 }}>
											<PlayCircleOutline aria-label="add to favorites"></PlayCircleOutline>
											<AddCircleOutline aria-label="share"></AddCircleOutline>
										</CardActions>
									</CardContent>
								</Card>
							</CardActionArea>
						</Grid>
					</React.Fragment>
				))}
			</Grid>
			{!movieList[0] ? (
				<p className="no-result-found">No results found for your Search.</p>
			) : null}
		</>
	);
};

MovieList.propTypes = {
	movieList: PropTypes.arrayOf(
		PropTypes.shape({ Poster: PropTypes.string, imdbID: PropTypes.string })
	),
};

export default MovieList;
