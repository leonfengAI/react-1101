import { useThemeStore } from '../store/themeStore';
import { useLanguageStore } from '../store/languageStore';
import '../css/FunctionPanel.css';

interface UseCase {
  id: string;
  displayName: string;
}

interface FunctionPanelProps {
  selectedOrg: string;
  setSelectedOrg: (org: string) => void;
  selectedUseCase: string;
  setSelectedUseCase: (useCase: string) => void;
}

export function FunctionPanel({ 
  selectedOrg, 
  setSelectedOrg, 
  selectedUseCase, 
  setSelectedUseCase 
}: FunctionPanelProps) {
  const { isDark } = useThemeStore();
  const { t } = useLanguageStore();

  const useCases: UseCase[] = [
    { id: '1', displayName: 'Column Field RAG' },
    { id: '2', displayName: 'UseCase 2' },
    { id: '3', displayName: 'UseCase 3' },
    { id: '4', displayName: 'UseCase 4' },
    { id: '5', displayName: 'UseCase 5' }
  ];

  return (
    <div className={`function-panel ${isDark ? 'function-panel--dark' : 'function-panel--light'}`}>
      <div className="panel-section">
        <label htmlFor="org_select" className={`section-label ${isDark ? 'section-label--dark' : 'section-label--light'}`}>
          {t('organization')}
        </label>
        <select
          id="org_select"
          value={selectedOrg}
          onChange={(e) => setSelectedOrg(e.target.value)}
          className={`org-select ${isDark ? 'org-select--dark' : 'org-select--light'}`}
        >
          <option value="MDM">MDM</option>
          <option value="RDS">RDS</option>
        </select>
      </div>

      <div className="panel-section">
        <label className={`section-label ${isDark ? 'section-label--dark' : 'section-label--light'}`}>
          {t('useCases')}
        </label>
        <div className="use-cases">
          {useCases.map((useCase) => (
            <div key={useCase.id} className="use-case-item">
              <input
                type="radio"
                id={`use-case-${useCase.id}`}
                name="use-case"
                value={useCase.id}
                checked={selectedUseCase === useCase.id}
                onChange={(e) => setSelectedUseCase(e.target.value)}
                className={`use-case-radio ${isDark ? 'use-case-radio--dark' : 'use-case-radio--light'}`}
              />
              <label
                htmlFor={`use-case-${useCase.id}`}
                className={`use-case-label ${isDark ? 'use-case-label--dark' : 'use-case-label--light'}`}
              >
                {useCase.displayName}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}