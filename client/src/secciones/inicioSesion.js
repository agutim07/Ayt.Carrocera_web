import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, {useState, useRef} from 'react';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const InicioSesion = () => {

    const [details, setDetails] = useState({user:'', pass:''});
    const navigate = useNavigate();


    const handleSubmit = () => {
        /*
        axios.post('/api/login', {
        user:details.user, pass:details.pass
        }).then(response => {
        navigate('/inicio')
        console.log(response);
        }).catch(error => {
        console.log(error);
        });*/
    };

    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <ThemeProvider theme={darkTheme}>
                <Grid container direction="column" spacing={0} justifyContent="center" alignItems="center" sx={{my:{xs:0,sm:2}}}>
                        <Grid item>
                            <TextField sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
                                mt:1, justifyContent:"center",  flexDirection: 'column'}}
                                id="outlined-basic" label="User" variant="outlined"
                                onChange={e => setDetails({...details, user: e.target.value})} />
                        </Grid>
                        <Grid item>
                            <TextField sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
                                mt:1, justifyContent:"center",  flexDirection: 'column'}}
                                id="outlined-basic" label="Pass" variant="outlined" 
                                onChange={e => setDetails({...details, pass: e.target.value})} />
                        </Grid>
                        <Grid item>
                            <Button onClick={handleSubmit} variant="text">Iniciar sesion</Button>
                        </Grid>
                </Grid>
            </ThemeProvider>
        </Box>
    );
}

export default InicioSesion;