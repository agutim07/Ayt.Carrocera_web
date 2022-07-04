import './App.css';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar';

import Header from './components/header.js';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Work Sans',
    ].join(','),
},});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ mx: 20, mt: 2 }}> 
      <Header />
    </Box>
    </ThemeProvider>
  );
}

export default App;
