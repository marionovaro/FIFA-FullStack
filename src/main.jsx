import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes.jsx';
import { AuthContextProvider } from './context/authContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
 <AuthContextProvider>
    <RouterProvider router = {router}/> {/* el routerprovider nos lo da el react router dom y le proveemos en el prop con las rutas que hemos hecho en routes.jsx */}
 </AuthContextProvider>
  
);
