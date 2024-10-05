import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {router} from "./app-router.jsx";
// import App from './App.jsx'
import './index.css'
// import 'animate.css';

// Import Noto Sans Sinhala font
import '@fontsource/noto-sans-sinhala'; // Import the default weight
// Optionally, import different weights if needed
// import '@fontsource/noto-sans-sinhala/400.css'; // Regular weight
// import '@fontsource/noto-sans-sinhala/700.css'; // Bold weight

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    {/* <App /> */}
  </StrictMode>,
)
