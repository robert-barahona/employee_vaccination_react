import React from 'react'

interface Props {
  children?: React.ReactNode;
  header?: React.ReactNode;
}

export const DataContainer = React.memo(({ children, header }: Props) => {
  return (
    <div className='d-flex flex-column bg-white shadow rounded-3 h-100 overflow-hidden' >
      <div className='p-4'>
        {header}
      </div>
      <div className='h-100 overflow-auto p-4 pt-0'>
        {children}
      </div>
    </div>
  )
})
