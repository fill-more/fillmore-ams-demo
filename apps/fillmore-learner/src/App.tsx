import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import CalendarPage from './pages/CalendarPage';
import TrainingPage from './pages/TrainingPage';
import ReadingPage from './pages/ReadingPage';
import PracticePage from './pages/PracticePage';
import { PATHNAME } from './lib/constants';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import NotFoundPage from './pages/NotFoundPage';

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
            <Route path={PATHNAME.MAIN} element={<MainPage />} />
            <Route path={PATHNAME.CALENDAR} element={<CalendarPage />} />
            <Route path={PATHNAME.TRAINING} element={<TrainingPage />} />
            <Route path={PATHNAME.READING} element={<ReadingPage />} />
            <Route path={PATHNAME.PRACTICE} element={<PracticePage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
