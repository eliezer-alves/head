import { ReactNode } from 'react'

type BodyProps = {
  children?: ReactNode
}

export function Page({ children }: BodyProps) {
  return (
    <>
      <div className="w-full h-full flex-col-center">
        <div className="h-5/6 w-full flex-center scroll-m-1 overflow-y-auto mobile:h-9/10 mobile:pt-2">
          {children}
        </div>
      </div>
    </>
  )
}
