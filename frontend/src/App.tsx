import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // 현재 경로에 따라 탭 선택
  const value = location.pathname.startsWith('/matching') ? '/matching' : '/';

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', width: '100vw' }}>
      <header style={{background: '#fff', borderBottom: '1px solid #eee', width: '100%'}}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 16px', fontWeight: 700, textAlign: 'left', width: '100%' }}>
          <Link to="/" style={{ textAlign: 'left', color: 'black' }}>Oksu Matching</Link>
        </div>
      </header>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 16px', width: '100%' }}>
        <Tabs value={value} onChange={(_, v) => navigate(v)} sx={{ mb: 2 }}>
          <Tab label="선수목록" value="/" />
          <Tab label="자동매칭" value="/matching" />
        </Tabs>

        <Outlet />
      </div>
    </div>
  );
}
