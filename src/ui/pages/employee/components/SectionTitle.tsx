import { Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react'
import { SizedBox } from '../../../components';

interface Props {
  title: string;
  onPress: () => void;
}

export const SectionTitle = React.memo(({ title, onPress }: Props) => {
  return (
    <div className='d-flex align-items-center' style={{ alignSelf: 'flex-start' }}>
      <span className="fs-4 fw-bold ps-4 pb-1">
        {title}
      </span>
      <SizedBox size={10} />
      <IconButton onClick={onPress}>
        <Edit />
      </IconButton>
    </div>
  )
})
