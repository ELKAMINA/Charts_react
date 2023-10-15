import React from 'react';
import AppBar from '@mui/material/AppBar';
import {
  Button,
  Container, Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import MainMenu from './Menu';
import smartImpulseLogo from '../assets/smat-impulse-logo.png';

const theme = createTheme({
  palette: {
    // primary: {
    //   main: '#999999',
    // },
  },
});

function Navbar() {
  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate('/');
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'rgba(145, 146, 146, 0.6)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Container>
          <Button onClick={handleImageClick}>
            <img
              src={smartImpulseLogo}
              alt="smart-impulse-logo"
              style={{
                width: '100%',
                maxWidth: '8vw',
                minWidth: '8vh',
                height: 'auto',
              }}
            />

          </Button>
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
            <PersonIcon
              fontSize="large"
              sx={{
                m: 2,
              }}
            />
            <Typography sx={{
              fontSize: {
                xs: 11,
                sm: 15,
                md: 20,
                lg: 25,
                color: 'white',
              },
              fontWeight: 'bold',
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
