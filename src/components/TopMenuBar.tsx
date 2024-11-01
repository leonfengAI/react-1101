import { useState, useCallback } from 'react';
import { Cog6ToothIcon, LanguageIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { useThemeStore } from '../store/themeStore';
import { useLanguageStore } from '../store/languageStore';
import { useNavigate } from 'react-router-dom';
import '../css/TopMenuBar.css';

interface TopMenuBarProps {
  userAvatar: string;
  username?: string;
}

export const TopMenuBar = ({ userAvatar, username }: TopMenuBarProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [showLLMDialog, setShowLLMDialog] = useState(false);
  const { isDark, toggleTheme } = useThemeStore();
  const { t, setLanguage } = useLanguageStore();
  const navigate = useNavigate();

  const navigationOptions = [
    { name: 'ITSM Management', path: '/itsm' },
    { name: 'Chatbot', path: '/chat' },
    { name: 'User Management', path: '/users' },
    { name: 'Work Flow Management', path: '/workflow' }
  ];

  const handleMenuClick = useCallback((option: string) => {
    if (option === 'Theme') {
      toggleTheme();
    } else if (option === 'LLM') {
      setShowLLMDialog(true);
      setTimeout(() => setShowLLMDialog(false), 2000);
    }
    setIsSettingsOpen(false);
  }, [toggleTheme]);

  const handleLanguageChange = useCallback((langCode: string) => {
    setLanguage(langCode);
    setIsLanguageOpen(false);
  }, [setLanguage]);

  const handleLogout = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleNavigation = useCallback((path: string) => {
    navigate(path);
    setIsNavigationOpen(false);
  }, [navigate]);

  const toggleMenu = useCallback((menuSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    const allSetters = [setIsSettingsOpen, setIsProfileOpen, setIsLanguageOpen, setIsNavigationOpen];
    allSetters.forEach(setter => {
      if (setter !== menuSetter) {
        setter(false);
      }
    });
    menuSetter(prev => !prev);
  }, []);

  return (
    <div className={`top-menu-bar ${isDark ? 'top-menu-bar--dark' : 'top-menu-bar--light'}`}>
      <div className="logo-section">
        <span className="logo-text">Generative AI</span>
      </div>

      <div className="menu-controls">
        <div className="relative">
          <button
            onClick={() => toggleMenu(setIsNavigationOpen)}
            className={`menu-button ${isDark ? 'menu-button--dark' : 'menu-button--light'}`}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="menu-button-text">Menu</span>
          </button>
          {isNavigationOpen && (
            <div className={`settings-menu ${isDark ? 'settings-menu--dark' : 'settings-menu--light'}`}>
              {navigationOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleNavigation(option.path)}
                  className={`menu-item ${isDark ? 'menu-item--dark' : 'menu-item--light'}`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => toggleMenu(setIsLanguageOpen)}
            className={`menu-button ${isDark ? 'menu-button--dark' : 'menu-button--light'}`}
          >
            <LanguageIcon className="w-5 h-5" />
            <span className="menu-button-text">Language</span>
          </button>
          {isLanguageOpen && (
            <div className={`settings-menu ${isDark ? 'settings-menu--dark' : 'settings-menu--light'}`}>
              {['en', 'zh', 'ja'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`menu-item ${isDark ? 'menu-item--dark' : 'menu-item--light'}`}
                >
                  {lang === 'en' ? 'English' : lang === 'zh' ? '中文' : '日本語'}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => toggleMenu(setIsSettingsOpen)}
            className={`menu-button ${isDark ? 'menu-button--dark' : 'menu-button--light'}`}
          >
            <Cog6ToothIcon className="w-5 h-5" />
            <span className="menu-button-text">Settings</span>
          </button>
          {isSettingsOpen && (
            <div className={`settings-menu ${isDark ? 'settings-menu--dark' : 'settings-menu--light'}`}>
              {[t('theme'), 'LLM'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleMenuClick(option)}
                  className={`menu-item ${isDark ? 'menu-item--dark' : 'menu-item--light'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => toggleMenu(setIsProfileOpen)}
            className="user-avatar"
          >
            <img
              src={userAvatar}
              alt="User"
              className="w-full h-full object-cover"
            />
          </button>
          {isProfileOpen && (
            <div className={`user-menu ${isDark ? 'user-menu--dark' : 'user-menu--light'}`}>
              <div className={`user-info ${isDark ? 'user-info--dark' : 'user-info--light'}`}>
                {username || 'Guest'}
              </div>
              <button
                onClick={handleLogout}
                className={`logout-button ${isDark ? 'logout-button--dark' : 'logout-button--light'}`}
              >
                {t('logout')}
              </button>
            </div>
          )}
        </div>
      </div>

      {showLLMDialog && (
        <div className="llm-dialog">
          LLM has switched to GPT-4
        </div>
      )}
    </div>
  );
}