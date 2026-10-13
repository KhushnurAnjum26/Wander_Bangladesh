
import Dashboard from './Dashboard';

export default function Traveller({ onExit }) {
  return <Dashboard onExit={onExit} initialRole="user" />;
}
