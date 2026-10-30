import { useCallback, useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Analyzer from './pages/Analyzer';
import History from './pages/History';
import ModelInfo from './pages/ModelInfo';
import { checkHealth, predictComplaint } from './services/api';
export default function App() {
  const [page, setPage] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking');
  const [health, setHealth] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const refreshHealth = useCallback(async () => {
    setApiStatus('checking');
    try { const data = await checkHealth(); setHealth(data); setApiStatus('online'); }
    catch { setHealth(null); setApiStatus('offline'); }
  }, []);
  useEffect(() => { refreshHealth(); const timer = window.setInterval(refreshHealth, 60000); return () => window.clearInterval(timer); }, [refreshHealth]);
  const onPredict = async (text) => {
    setLoading(true); setError(''); setResult(null);
    try {
      const data = await predictComplaint(text);
      setResult(data); setApiStatus('online');
      setHistory(prev => [{ id: `${Date.now()}-${Math.random()}`, text: text.trim(), result: data, timestamp: new Date().toISOString() }, ...prev]);
    } catch (e) { setError(e.message || 'An unexpected error occurred.'); if (/reach|network|failed|unavailable/i.test(e.message)) setApiStatus('offline'); }
    finally { setLoading(false); }
  };
  const clearResult = () => { setResult(null); setError(''); };
  const clearHistory = () => { setHistory([]); };
  const pageContent = useMemo(() => {
    if (page === 'analyzer') return <Analyzer onPredict={onPredict} loading={loading} error={error} result={result} clearResult={clearResult} apiStatus={apiStatus}/>;
    if (page === 'history') return <History history={history} clearHistory={clearHistory}/>;
    if (page === 'model') return <ModelInfo/>;
    return <Dashboard apiStatus={apiStatus} health={health} history={history} setPage={setPage}/>;
  }, [page, apiStatus, health, history, loading, error, result]);
  return <div className="app-shell"><Sidebar page={page} setPage={setPage} mobileOpen={mobileOpen} closeMobile={() => setMobileOpen(false)}/><main className="main-area"><Navbar page={page} onMenu={() => setMobileOpen(true)} apiStatus={apiStatus}/>{pageContent}<footer className="app-footer"><span>© 2026 COMPLAINTOPS <i/> BANKING CUSTOMER COMPLAINT INTELLIGENCE</span><span>BUILT FOR NLP RESEARCH <b>✳</b></span></footer></main></div>;
}
