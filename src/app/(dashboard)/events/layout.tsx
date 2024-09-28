import DashboardNavbar from '@/components/DashboardNavbar'
import Footer from '@/components/Footer'
import { CopilotPopup } from '@copilotkit/react-ui'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main>
      <DashboardNavbar/>
      {children}
      <Footer/>
      <CopilotPopup/>
    </main>
  )
}

export default layout
