import Container from '@mui/material/Container';
import React from 'react';
import Navbar from '../components/Navbar';
import BarChart from '../components/BarChart';

function Projects() {
  return (
    <>
      <Navbar />
      <Container sx={{
        marginTop: '5%',
        alignItems: 'center',
        width: '100%',
        height: '60vh',
      }}
      >
        <BarChart />
      </Container>
    </>
  );
}

export default Projects;
