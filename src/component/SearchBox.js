import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

const SearchBox = ({ searchTerm, setSearchTerm }) => {
	const [searchExpand, setSearchExpand] = useState(false);
	const inputRef = useRef(null);

	return (
		<Search
			className={
				searchExpand
					? "search--box-wrapper search--expanded"
					: "search--box-wrapper"
			}
		>
			<SearchIconWrapper
				className="search--icon-wrapper"
				onClick={() => {
					setSearchExpand(true);
					inputRef.current.focus();
				}}
			>
				<SearchIcon className="search--icon" />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search…"
				inputProps={{ "aria-label": "search", ref: inputRef }}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<IconButton
				aria-label="delete"
				className="close--icon-wrapper"
				onClick={() => {
					inputRef.current.focus();
					setSearchTerm("");
				}}
			>
				<CloseIcon className="close--icon" />
			</IconButton>
		</Search>
	);
};

export default SearchBox;
