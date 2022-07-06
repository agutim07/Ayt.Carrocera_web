import './App.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

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
