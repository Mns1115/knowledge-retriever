import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import AddIcon from '@mui/icons-material/AddCircle';
import logo from '../ALT+AI_logo.png'
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
import { useCallback, useEffect, useState } from "react";
import ColorSchemeToggle from './ColorSchemeToggle';
import { closeSidebar } from '../utils';
import { Navigate, useNavigate } from 'react-router-dom';

import Snackbar from '@mui/joy/Snackbar';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';

import axios from "axios";
axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
// axios.defaults.headers.post['Content-Type'] = "multipart/form-data";


const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

function Toggler(props: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const { defaultExpanded = false, renderToggle, children } = props;
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}
export default function Sidebar() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();
  const [open, setOpen] = React.useState<boolean>(false);
  const[errmsg ,setError]= useState('')
  const [open1, setOpen1] = React.useState(false);
  const [username, setUsername] = useState(localStorage.getItem('googleFirstName'))
  const [email, setEmail] = useState(localStorage.getItem('googleEmail'))
  const [profile, setProfile] = useState(localStorage.getItem('profile'))
  useEffect(() => {
    const storedUsername = localStorage.getItem("googleFirstName");
    const storedEmail = localStorage.getItem("googleEmail");
    const storedProfile = localStorage.getItem("profile");
    if (storedUsername) {
      setUsername(storedUsername);
      setEmail(storedEmail)
      setProfile(storedProfile)
    }
  }, []);




  const handleDummy = async () => {
    const response = await axios.post("http://127.0.0.1:8000/api/dummy", {

    });

    console.log(response);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleUpload = async () => {

    const formData = new FormData();
    formData.append("file", file!);
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const response = await axios.post("http://127.0.0.1:8000/api/newsession",
      formData,
      { headers });

    console.log(response);
    if (response.status == 201) {
      localStorage.setItem('sessionid', response.data['sessionid'])
      setOpen(false);
      setError('Your file was uploaded successfully.')
      setOpen1(true)
      
    }
    else {
      console.log("Error uploading");
      setError('Error uploading your file')
    }
  };
  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage when the button is clicked
    navigate('/auth')
  };
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >

      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {/* <BrightnessAutoRoundedIcon /> */}
        <img src={logo} alt="logo" height="25px" width="25px" />
        <Typography level="title-lg">AltPlusAi</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton selected>
              <AddIcon></AddIcon>
              <ListItemContent>
                <Typography level="title-sm">New Conversation</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleDummy}>
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" >Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <QuestionAnswerRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">History</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                  >

                    History 1
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton >History 2</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>History 3</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>
        <Card
          invertedColors
          variant="soft"
          color="neutral"
          size="sm"
          sx={{ boxShadow: 'none' }}
        >
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            color="neutral"
            startDecorator={
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </SvgIcon>
            }
            onClick={() => setOpen(true)} >
            Upload a file
            {/* <VisuallyHiddenInput type="file" /> */}
          </Button>
          {/* <Button onClick={handleUpload}>Upload button</Button> */}
          <Snackbar
            variant="soft"
            color="success"
            open={open1}
            onClose={() => setOpen1(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
            endDecorator={
              <Button
                onClick={() => setOpen1(false)}
                size="sm"
                variant="soft"
                color="success"
              >
                Dismiss
              </Button>
            }
          >
            {errmsg}
          </Snackbar>
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Sheet
              variant="outlined"
              sx={{
                maxWidth: 500,
                borderRadius: 'md',
                p: 3,
                boxShadow: 'lg',
              }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
              >
                Upload File
              </Typography>
              <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                variant="outlined"
                color="neutral"
                startDecorator={
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </SvgIcon>
                }
                onClick={() => setOpen(true)} >
                Upload a file
                <VisuallyHiddenInput type="file" onChange={handleFile} />

              </Button>
              <Typography>
                File name: {file?.name}
              </Typography>
              <Button onClick={handleUpload}>Upload button</Button>
            </Sheet>
          </Modal>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography level="title-sm">Used space</Typography>
            {/* <IconButton size="sm">
              <CloseRoundedIcon />
            </IconButton> */}
          </Stack>
          <Typography level="body-xs">
            You have used maximum space. Need more?
          </Typography>
          <LinearProgress variant="outlined" value={90} determinate sx={{ my: 1 }} />
          <Button size="sm" variant="solid">
            Upgrade plan
          </Button>
        </Card>
        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Support
            </ListItemButton>
          </ListItem>
        </List>

      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src={`${profile}`}
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{username}</Typography>
          <Typography level="body-xs">{email}</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral">
          <LogoutRoundedIcon onClick={handleLogout} />
        </IconButton>
      </Box>
    </Sheet>
  );
}
