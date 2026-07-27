import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const notesPages = [
  { title: 'Resume', path: 'https://drive.google.com/file/d/1cLqpiD8GC5tvNAQhh8DRrnDYhrrRmshG/view?usp=drive_link' }, // This will open the PDF
  { title: 'Documentation', path: 'https://docs.google.com/document/d/17X7w1OyJAuQir64pAb_lXlpp-IyH6aAg9zIYWodFZ-c/edit?usp=sharing' },
];

const Navbar = () => {
  const [notesAnchorEl, setNotesAnchorEl] = useState(null);

  const handleNotesClick = (event) => {
    setNotesAnchorEl(event.currentTarget);
  };

  const handleNotesClose = () => {
    setNotesAnchorEl(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ width: '100%' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={RouterLink}
          to="/" 
          sx={{ flexGrow: 1, color: 'primary.main', textDecoration: 'none' }} // Removed underline
        >
          Restaurant Management 
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            color="primary"
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
          >
            HomePage
          </Button>
          <Button
            color="primary"
            onClick={handleNotesClick}
            startIcon={<MenuBookIcon />}
          >
            Notes
          </Button>
          <Menu
            anchorEl={notesAnchorEl}
            open={Boolean(notesAnchorEl)}
            onClose={handleNotesClose}
          >
            {notesPages.map((page) => (
              <MenuItem
                key={page.path}
                component="a" // Use a regular anchor tag for opening static files
                href={page.path}  // Link to the Resume PDF (this should be served from /public)
                target="_blank"  // Ensure it opens in a new tab
                onClick={handleNotesClose}
              >
                {page.title}
              </MenuItem>
            ))}
          </Menu>
          <IconButton
            color="primary"
            component="a"
            href="https://github.com/utkalika9/restaurantMgmt"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
