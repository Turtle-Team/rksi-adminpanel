import React, {useState,useEffect} from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings'; 
import SendIcon from '@mui/icons-material/Send';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeIcon from '@mui/icons-material/Home';


const drawerWidth = 240;

type Data = {
  login: string;
};

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function CreateDivision() {
  const [newDivision, setNewDivision] = useState({ name: '', hour_work: '',auditoria:'',floor:'',description:'', });
  const [responseData, setResponseData] = useState<Data | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  const icons = [
    <HomeIcon />,
    <SendIcon />,
    <PersonAddAltIcon />,
    <ApartmentIcon />,
    <SettingsIcon />,
  ];
  const handleClick = () => {
    axios
      .post('http://192.168.1.92:12222/api/division/', newDivision, {
        params: {
          token: token,
        },
      })
      .then((response) => {
        setSuccessMessage('Подразделение успешно создано.');
        setErrorMessage(''); // Clear any previous error messages
        console.log('User created:', response.data);
      })
      .catch((error) => {
        setErrorMessage('Ошибка.');
        setSuccessMessage(''); // Clear any previous success messages
        console.error('Error creating user:', error);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDivision({ ...newDivision, [name]: value });
  };

  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    } }, [token]);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Очистить токен из локального хранилища
    localStorage.removeItem('token');
    // Перенаправить пользователя на страницу авторизации
    window.location.href = '/'; // Меняем URL для перенаправления
  };
  const handleSettings = () => {
    navigate('/settings');
  };
  const handleCreateUser = () => {
    navigate('/create');
  };
  
  const handleHome = () => {
    navigate('/admin');
  };

    
    const handleChanges = () => {
      navigate('/changes');
    };
    const handleDivision = () => {
        navigate('/division');
      };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
Админ-панель
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
  {["Главная", 'Рассылка', 'Создать пользователя', 'Подразделения', 'Настройки'].map((text, index) => (
    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
        onClick={text === 'Главная' ? handleHome : text === 'Создать пользователя' ? handleCreateUser  : text === 'Настройки' ? handleSettings : text === 'Рассылка' ? handleChanges  : text === 'Подразделения' ? handleDivision : undefined }
        >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {icons[index]}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  ))}
</List>
        <Divider />
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <form >
          <div>
            <TextField
              label="Название"
              name="name"
              value={newDivision.name}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 ,m: 1, width: '50%' }}
              
            />
          </div>
          <div>
            <TextField
              label="Часы работы"
              name="hour_work"
              value={newDivision.hour_work}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 ,m: 1, width: '50%' }}            />
          </div>
          <div>
            <TextField
              label="Аудитория"
              name="auditoria"
              value={newDivision.auditoria}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 ,m: 1, width: '50%' }}            />
          </div>
          <div>
            <TextField
              label="Этаж"
              name="floor"
              value={newDivision.floor}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 ,m: 1, width: '50%' }}            />
          </div>
          <div>
            <TextField
              label="Описание"
              name="description"
              value={newDivision.description}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 ,m: 1, width: '50%' }}            />
          </div>
          <div><br />
            <Button variant="contained" sx={{ marginBottom: 2 ,m: 1}} color="primary" onClick={handleClick}>
Создать            </Button>
          </div>
          {successMessage && (
          <div style={{ color: 'green' }}>{successMessage}</div>
        )}
        {errorMessage && (
          <div style={{ color: 'red' }}>{errorMessage}</div>
        )}
        </form>
        
      </Box>
    </Box>
  );
}