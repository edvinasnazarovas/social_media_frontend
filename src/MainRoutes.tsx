import { Route, Routes } from 'react-router-dom';
import RegisterPage from './ui/auth/RegisterForm';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello World</h1>} />
    </Routes>
  );
}

export default MainRoutes;