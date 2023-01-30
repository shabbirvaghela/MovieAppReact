import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import profileSample from "../../src/assets/images/profile-sample.png";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import UpdateIcon from "@mui/icons-material/Update";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import LightModeIcon from "@mui/icons-material/LightMode";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchBox from "../component/SearchBox";

const drawerWidth = 275;

const Sidebar = ({ window, setSearchTerm, searchTerm }) => {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<>
			<div sx={{ textAlign: "center" }} className="profile--wrapper">
				<a href="#!">
					<img src={profileSample} alt="" className="user--image" />
					<h4 className="user--name">Eric Hoffman</h4>
				</a>
			</div>
			<Divider />
			<List>
				{["Discover", "Playlist", "Movie", "TV Shows", "My List"].map(
					(text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton className={index === 0 ? "active" : null}>
								<ListItemIcon>
									{index === 0 && <SearchIcon />}
									{index === 1 && <PlaylistPlayIcon />}
									{index === 2 && <LiveTvIcon />}
									{index === 3 && <DesktopWindowsOutlinedIcon />}
									{index === 4 && <ListOutlinedIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					)
				)}
			</List>
			<Divider />
			<List>
				{["Watch Later", "Recomended"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <UpdateIcon /> : <PlaylistPlayIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["Setting", "Logout"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? (
									<SettingsOutlinedIcon />
								) : (
									<LogoutOutlinedIcon />
								)}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<>
			<CssBaseline />
			<AppBar
				enableColorOnDark
				sx={{
					width: { lg: `calc(100% - ${drawerWidth}px)` },
					ml: { lg: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: { xs: 0.5, sm: 2 }, display: { lg: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
					<IconButton
						sx={{ ml: { xs: 1, sm: 2, md: 3 } }}
						aria-label="Clear Searchbox text"
					>
						<LightModeIcon />
					</IconButton>
					<IconButton sx={{ ml: { xs: 0.3, sm: 1 } }} aria-label="More Option">
						<MoreVertIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
				aria-label="mailbox folders"
			>
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { lg: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", lg: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
		</>
	);
};

Sidebar.propTypes = {
	window: PropTypes.func,
	searchTerm: PropTypes.string.isRequired,
	setSearchTerm: PropTypes.func.isRequired,
};

export default Sidebar;
