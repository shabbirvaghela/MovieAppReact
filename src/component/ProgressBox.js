import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const LinearProgressWithLabel = (props) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "100%", mr: 1 }}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box>
				<Typography variant="body2" color="text.secondary">
					{props.value / 10}/10
				</Typography>
			</Box>
		</Box>
	);
};

LinearProgressWithLabel.propTypes = {
	value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel(props) {
	const [progress, setProgress] = React.useState(0);
	React.useEffect(() => {
		setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress));
	}, []);

	return (
		<Box sx={{ width: "100%" }}>
			<LinearProgressWithLabel value={props.rating * 10} />
		</Box>
	);
}
