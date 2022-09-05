import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Dialog from '@mui/material/Dialog';
import { DialogTitle } from '@mui/material';
import { DialogActions, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';

  function AdminHeadbar({onLogOut}){
    const [openCS, setOpenCS] = useState(false);

    const handleCloseCS = () => {
      setOpenCS(false);
    };
    const handleSubmitCS = () => {
        setOpenCS(false);
        onLogOut();
    };


    return(
      <div>
      <MuiAppBar position="absolute" style={{ background: 'blue' }}>
        <Toolbar
          sx={{
            pr: '24px', 
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            ADMINISTRADOR
          </Typography>
          <IconButton color="inherit" onClick={()=>setOpenCS(true)}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>

      <Box sx={{position: "absolute", bottom: 20, right: 20}} >
      <Dialog fullWidth="300px" sx={{width:"50"}} open={openCS} onClose={handleCloseCS} aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title"> Cerrar Sesión </DialogTitle>
          <DialogContent>
            ¿Estás seguro?
          </DialogContent>
          <DialogActions>
              <Button onClick={handleSubmitCS} ><strong>SI</strong></Button>
              <Button onClick={handleCloseCS} > NO </Button>
          </DialogActions>
      </Dialog>
      </Box>
      </div>
    );
}

export default AdminHeadbar;