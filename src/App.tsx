import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/checklist" element={<div className="p-4">Checklist Page (Coming Soon)</div>} />
        <Route path="/documents" element={<div className="p-4">Documents Page (Coming Soon)</div>} />
        <Route path="/training" element={<div className="p-4">Training Page (Coming Soon)</div>} />
        <Route path="/team" element={<div className="p-4">Team Page (Coming Soon)</div>} />
      </Route>
    </Routes>
  );
}

export default App;
