import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export const SidebarData = [
  {
    title: 'ホーム',
    icon: <HomeIcon />,
    link: '/'
  },
  {
    title: '勉強',
    icon: <CreateIcon />,
    link: '/study'
  },
  {
    title: '記録',
    icon: <MenuBookIcon />,
    link: '/record'
  }
]