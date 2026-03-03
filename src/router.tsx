import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/components/layout/RootLayout'
import HomePage from '@/pages/HomePage'
import ProfilePage from '@/pages/ProfilePage'
import ContactPage from '@/pages/ContactPage'
import WorkDetailPage from '@/pages/WorkDetailPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'work/:slug', element: <WorkDetailPage /> },
    ],
  },
])
