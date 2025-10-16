import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { PATHNAME } from './lib/constants';
import MapPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TraineeGradingPage from './pages/TraineeGradingPage';
import UserDetailPage from './pages/UserDetailPage';
import CalendarPage from './pages/CalendarPage';

function AppLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHNAME.LOGIN} element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<AppLayout />}>
            <Route path={PATHNAME.MAP} element={<MapPage />} />
            <Route path={PATHNAME.MAIN} element={<MainPage />} />
            <Route
              path={PATHNAME.TRAINEE_GRADING}
              element={<TraineeGradingPage />}
            />
            <Route path={PATHNAME.USER_DETAIL} element={<UserDetailPage />} />
            <Route path={PATHNAME.CALENDAR} element={<CalendarPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
