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
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings'; 
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeIcon from '@mui/icons-material/Home';


const drawerWidth = 240;

type Data = {
  login: string;
};
type DocData = {
    doc_id: number;
    type: number;
    fio: string;
    from_id: string;
    platform: string;
    description: string;
    is_ready: number;
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

export default function Sidebar() {
  const [responseData, setResponseData] = useState<Data | null>(null);
  const [data, setData] = useState<DocData[]>([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();




  const [docTypes, setDocTypes] = useState<number[]>([]);

  const icons = [
    <HomeIcon />,
    <SendIcon />,
    <PersonAddAltIcon />,
    <ApartmentIcon />,
    <SettingsIcon />,
  ];
  
  useEffect(() => {
    if (!token) {
        // Если токена нет, перенаправить пользователя на страницу авторизации
        window.location.href = '/';
    } else {
        // Получение данных о документах
        axios.get('http://192.168.1.92:12222/api/doc/', {
            params: {
                token: token,
            },
        })
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

        // Получение данных о типах документов
        axios.get('http://192.168.1.92:12222/api/doc/type', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            setDocTypes(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }
}, [token]);


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
  const handleCreateUser = () => {
    navigate('/create');
  };
  
  const handleSettings = () => {
      navigate('/settings');
    };
    
    const handleChanges = () => {
      navigate('/changes');
    };
    const handleDivision = () => {
        navigate('/division');
      };
    const handleHome = () => {
        navigate('/admin');
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
        {data.map((doc) => (
          <li key={doc.doc_id}>
            <strong>Тип документа:</strong> {docTypes[doc.type] ? JSON.parse(JSON.stringify(docTypes[doc.type])).name : ''}<br/>
            <strong>ФИО:</strong> {doc.fio}<br />
            <strong>Описание:</strong> {doc.description}<br />

            <br />
          </li>
        ))}


      </Box>
    </Box>
  );
}