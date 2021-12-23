import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import PostAddIcon from '@mui/icons-material/PostAdd';
// import HomeIcon from '@mui/icons-material/Home';
// import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Link } from 'react-router-dom';

function Footer() {
	const [value, setValue] = useState(0);

	return (
		<Box sx={{ textAlign: 'center' }}>
			<BottomNavigation
				sx={{
					backgroundColor: '#00bbf9',
					position: 'fixed',
					bottom: '0',
					width: '100%',
					
				}}
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}>
				<BottomNavigationAction
					component={Link}
					to='/feed'
					sx={{ color: 'white' }}
					label='Home'
					// icon={<HomeIcon />}
				/>
				<BottomNavigationAction
					component={Link}
					to='/createPost'
					sx={{ color: 'white' }}
					label='Create Post'
					// icon={<PostAddIcon />}
				/>
				
				<BottomNavigationAction
					component={Link}
					to='/explore'
					sx={{ color: 'white' }}
					label='Explore'
					// icon={<TravelExploreIcon />}
				/>
			</BottomNavigation>
		</Box>
	);
}

export default Footer;
