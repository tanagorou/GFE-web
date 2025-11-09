import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from "notistack";
import AppRoutes from './routes';

function App(){
  return (
      <BrowserRouter>
        <AuthProvider>
          <SnackbarProvider
            anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
            >
            <AppRoutes />
          </SnackbarProvider>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App;
