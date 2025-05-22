import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import Navbar from './components/Navbar.jsx'
import CreatePage from './pages/CreatePage.jsx'
import { TooltipProvider } from "./components/CursorTooltipContext";

function App() {

  return (
    <Box minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.800')} boxShadow={'md'} mb={4}>
      <TooltipProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<CreatePage />} />
        </Routes>
      </TooltipProvider>
    </Box>
  )
}

export default App
