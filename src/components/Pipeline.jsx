import { ArrowRight, BrainCircuit, CheckCircle2, GitBranch, MessageSquareText, ScanText, ShieldCheck, Sparkles } from 'lucide-react';
const stages = [
  { title: 'Customer complaint', detail: 'Raw banking text', icon: MessageSquareText, tag: 'INPUT' },
  { title: 'Text preprocessing', detail: 'Normalize & prepare', icon: ScanText, tag: 'CLEAN' },
  { title: 'TF-IDF vectorization', detail: 'Text → feature vectors', icon: Sparkles, tag: 'FEATURES' },
  { title: 'Logistic regression', detail: 'Multi-class classifier', icon: BrainCircuit, tag: 'MODEL' },
  { title: 'Intent prediction', detail: 'Rank intent classes', icon: GitBranch, tag: 'OUTPUT' },
  { title: 'Confidence evaluation', detail: 'Assess score threshold', icon: ShieldCheck, tag: 'ASSESS' },
  { title: 'Routing action', detail: 'Determine next action', icon: CheckCircle2, tag: 'ROUTE' },
];
export default function Pipeline() { return <div className="pipeline-flow">{stages.map((stage, i) => <div className="pipeline-step-wrap" key={stage.title}><div className={`pipeline-step ${i === 3 ? 'model-step' : ''}`}><span className="pipeline-tag">{stage.tag}</span><div className="pipeline-icon"><stage.icon size={19}/></div><b>{stage.title}</b><small>{stage.detail}</small></div>{i < stages.length - 1 && <ArrowRight className="pipeline-arrow" size={16}/>}</div>)}</div>; }
