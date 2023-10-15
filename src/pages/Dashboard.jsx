import React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchAllUserProjects, selectProjects } from '../redux/Projects/projectSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchAllUserProjects());
  }, [dispatch]);

  const userProjects = useAppSelector(selectProjects);
  const handleClick = async (
    event,
  ) => {
    event.preventDefault();
    console.log(event.target.innerText);
    const projectName = event.target.innerText;
    const exist = userProjects.find((el) => el.name === projectName);
    if (exist) navigate(`/project/${exist.uuid}`);
  };
  return (
    <>
      <Navbar />
      <Typography
        sx={{
          fontSize: {
            xs: 10,
            sm: 20,
            md: 30,
            lg: 40,
          },
          m: 6,
          color: '#1ccbd5',
        }}
      >
        Dashboard

      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          margin: '8%',
        }}
      >
        {userProjects.map((el) => (
          <Item
            key={el.uuid}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              width: {
                xs: 180,
                sm: 200,
                md: 250,
                lg: 300,
              },
              height: {
                xs: 80,
                sm: 100,
                md: 150,
                lg: 200,
              },
              fontSize: {
                xs: 10,
                sm: 20,
                md: 30,
                lg: 40,
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
            onClick={handleClick}
          >
            {el.name}
          </Item>
        ))}
      </Stack>
    </>
  );
}

export default Dashboard;
