/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useMemo } from 'react';
import { Menu } from '@mui/material';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchAllUserProjects, selectProjects } from '../redux/Projects/projectSlice';

function MainMenu() {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const allProjects = useAppSelector(selectProjects);
  const memoizedProjects = useMemo(() => allProjects, [allProjects]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProjectClick = async (
    event,
  ) => {
    event.preventDefault();
    console.log(event.target.innerText);
    const projectName = event.target.innerText;
    const exist = allProjects.find((el) => el.name === projectName);
    if (exist) navigate(`/project/${exist.uuid}`);
  };

  // React.useEffect(() => {
  //   dispatch(fetchAllUserProjects());
  // }, [allProjects]);

  // console.log('allProjects ', allProjects);
  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={
          open ? 'fade-menu' : undefined
      }
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={() => ({
          fontSize: {
            xs: '0.5rem',
            sm: '0.7rem',
            md: '0.8rem',
            lg: '1rem',
          },
          color: 'yellow',
        })}
      >
        My projects
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {memoizedProjects.map((menu, index) => (
          <MenuItem
            key={menu.uuid}
            onClick={handleProjectClick}
          >
            {menu.name}
          </MenuItem>
        ))}
      </Menu>

    </div>
  );
}

export default MainMenu;
