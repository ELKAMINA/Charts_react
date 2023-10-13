import React from 'react';
import AppBar from '@mui/material/AppBar';
import {
  Container, Avatar, Typography,
} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import smartImpulseLogo from '../assets/smat-impulse-logo.png';
import MainMenu from './Menu';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(145,146,146,255)',
    },
  },
});

function Navbar() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        color="primary"
        sx={{
          flex: 'display',
          flexDirection: 'row',
        }}
      >
        <Container>
          <img
            src={smartImpulseLogo}
            alt="smart-impulse-logo"
          />
        </Container>
        <Container>
          <MainMenu />
        </Container>
        <Toolbar>
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNUKXpZECK0fPRdVpTN1mP828iGNWf8Apne_NMRYM66k9sPfY3Ehbux1vzlOOOPLOzkM0&usqp=CAU"
              sx={{
                margin: '5px',
                width: {
                  xs: 10,
                  sm: 20,
                  md: 30,
                  lg: 50,
                },
                height: {
                  xs: 10,
                  sm: 20,
                  md: 30,
                  lg: 50,
                },
              }}
            />
            <Typography sx={{
              fontSize: {
                xs: '1rem',
                sm: '1.1rem',
                md: '1.4rem',
                lg: '1.8rem',

              },
            }}
            >
              userX
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
