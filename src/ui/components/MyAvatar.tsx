import React from 'react';
import Avatar from '@mui/material/Avatar';

interface Props {
  name: string;
  size?: number;
}

export const MyAvatar = React.memo(({ name, size = 40 }: Props) => {

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  const stringAvatar = () => {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: size,
        height: size,
        fontSize: size / 2,
      },
      children: name.split(' ').length > 3 ? `${name.split(' ')[0][0]}${name.split(' ')[2][0]}` : name.substring(0, 2).toLocaleUpperCase(),
    };
  }

  return <Avatar {...stringAvatar()} />
})
