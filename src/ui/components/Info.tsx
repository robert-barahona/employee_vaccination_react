import React from 'react'
import { SizedBox } from './SizedBox';

interface Props {
  title: string;
  info?: string | null;
  icon?: React.ReactNode;
}

export const Info = React.memo(({ title, info, icon }: Props) => {
  return (
    <div className='d-flex flex-column'>
      <div className="d-flex align-items-center">
        <span className='fw-bold fs-6 max-lines-1'>
          {title}
        </span>
        <SizedBox size={10} />
        {icon}
      </div>
      <span className='max-lines-1 fs-5'>
        {info?.length ? info : 'sin completar'}
      </span>
    </div>
  )
})
