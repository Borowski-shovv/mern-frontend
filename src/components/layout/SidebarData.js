  
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Projekty',
    path: '/',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Projekt1',
        path: '/projekt1',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Projekt2',
        path: '/projekt2',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  }
]