import { SizedBox } from "."

export const PageContainer = ({ children }: any) => {
  return (
    <div className='container h-full py-5 d-flex flex-column'>
      <SizedBox size={65} />
      {children}
    </div>
  )
}
