import {
  DocumentTextIcon,
  BoltIcon,
  DocumentDuplicateIcon,
  CommandLineIcon,
  KeyIcon,
  ArrowDownTrayIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import '../css/MenuBar.css';

type MenuOption = 'WorkFlows' | 'Actions' | 'JobTemplate' | 'Scripts' | 'Secrets Manager' | 'Exports' | 'Configuration';

interface MenuBarProps {
  selectedMenu: MenuOption;
  onMenuSelect: (menu: MenuOption) => void;
}

const menuItems: { id: MenuOption; icon: React.ReactNode; label: string }[] = [
  { id: 'WorkFlows', icon: <DocumentTextIcon className="menu-icon" />, label: 'WorkFlows' },
  { id: 'Actions', icon: <BoltIcon className="menu-icon" />, label: 'Actions' },
  { id: 'JobTemplate', icon: <DocumentDuplicateIcon className="menu-icon" />, label: 'JobTemplate' },
  { id: 'Scripts', icon: <CommandLineIcon className="menu-icon" />, label: 'Scripts' },
  { id: 'Secrets Manager', icon: <KeyIcon className="menu-icon" />, label: 'Secrets Manager' },
  { id: 'Exports', icon: <ArrowDownTrayIcon className="menu-icon" />, label: 'Exports' },
  { id: 'Configuration', icon: <Cog6ToothIcon className="menu-icon" />, label: 'Configuration' }
];

export function MenuBar({ selectedMenu, onMenuSelect }: MenuBarProps) {
  return (
    <div className="menu-bar">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`menu-item ${selectedMenu === item.id ? 'menu-item--selected' : ''}`}
          onClick={() => onMenuSelect(item.id)}
        >
          {item.icon}
          <span className="menu-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}