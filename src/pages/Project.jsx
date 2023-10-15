import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Navbar from '../components/Navbar';
import BarChart from '../components/BarChart';

import { selectProjects } from '../redux/Projects/projectSlice';
import { useAppSelector } from '../redux/hooks';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Projects() {
  const url = (window.location.pathname).split('/')[2];
  const projectName = useAppSelector(selectProjects).find((el) => el.uuid === url);
  return (
    <>
      <Navbar />
      <Item
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          m: 3,
          fontWeight: 'bold',
          width: {
            xs: 60,
            sm: 80,
            md: 100,
            lg: 110,
          },
          height: {
            xs: 18,
            sm: 20,
            md: 25,
            lg: 30,
          },
          fontSize: {
            xs: 10,
            sm: 11,
            md: 12,
            lg: 15,
          },
          // backgroundColor: 'red',
          color: '#1ccbd5',
          '&:hover': {
            background: 'linear-gradient(180deg, #7ac623 0%, rgba(0, 181, 160, 0.69) 97%)',
            color: 'white',
          },
          borderRadius: 2,
          alignItems: 'center',
        }}
      >
        {projectName.name}
      </Item>
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
