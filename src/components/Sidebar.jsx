import { Activity, BrainCircuit, ChartNoAxesCombined, Command, FileClock, FlaskConical, LayoutDashboard, MessageSquareText, Workflow } from 'lucide-react';
const links = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, group: 'WORKSPACE' },
  { id: 'analyzer', label: 'Complaint analyzer', icon: MessageSquareText },
  { id: 'history', label: 'Prediction history', icon: FileClock },
  { id: 'model', label: 'Model & research', icon: BrainCircuit, group: 'INTELLIGENCE' },
];
export default function Sidebar({ page, setPage, mobileOpen, closeMobile }) {
  return <><div className={`sidebar-backdrop ${mobileOpen ? 'show' : ''}`} onClick={closeMobile}/><aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
    <div className="brand"><div className="brand-mark"><Command size={21}/></div><div><strong>complaint<span>ops</span></strong><small>INTELLIGENCE LAB</small></div></div>
    <div className="workspace-chip"><span className="workspace-dot"/> Research workspace <span className="chevron">⌄</span></div>
    {links.map((item, i) => <div key={item.id}>{item.group && <div className="nav-group">{item.group}</div>}<button className={`nav-link ${page === item.id ? 'active' : ''}`} onClick={() => {setPage(item.id); closeMobile();}}><item.icon size={17}/><span>{item.label}</span>{page === item.id && <span className="nav-active-dot"/>}</button></div>)}
    <div className="sidebar-bottom"><div className="lab-card"><div className="lab-icon"><FlaskConical size={16}/></div><div><b>Research build</b><small>Banking77 · NLP pipeline</small></div><span className="live-dot"/></div><div className="sidebar-foot"><span>COMPLAINTOPS</span><span>v1.0.0</span></div></div>
  </aside></>;
}
