import './IconSelector.css';

import React, { useState } from 'react';

import { icons } from 'lucide-react';

interface IconSelectorProps {
  selectedIcon: string;
  onIconSelect: (iconName: string) => void;
}

export const IconSelector: React.FC<IconSelectorProps> = ({
  selectedIcon,
  onIconSelect,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iconSearch, setIconSearch] = useState('');

  const iconNames = Object.keys(icons);
  const filteredIcons = iconNames.filter(name =>
    name.toLowerCase().includes(iconSearch.toLowerCase())
  );

  const handleIconSelect = (iconName: string) => {
    onIconSelect(iconName);
    setIsModalOpen(false);
  };

  const SelectedIconComponent = selectedIcon ? (icons as any)[selectedIcon] : null;

  return (
    <div className="icon-selector">
      <div 
        className="selected-icon" 
        onClick={() => setIsModalOpen(true)}
      >
        {selectedIcon ? (
          <>
            {
                SelectedIconComponent && <SelectedIconComponent size={24} /> 
            }
            <span>{selectedIcon}</span>
          </>
        ) : (
          <span className="placeholder">Select an icon</span>
        )}
      </div>

      {isModalOpen && (
        <div className="icon-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="icon-modal" onClick={e => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Search icons..."
              value={iconSearch}
              onChange={(e) => setIconSearch(e.target.value)}
              className="icon-search"
            />
            <div className="icon-grid">
              {filteredIcons.map((iconName) => {
                const IconComponent = (icons as any)[iconName];
                return (
                  <button
                    key={iconName}
                    type="button"
                    className={`icon-button ${selectedIcon === iconName ? 'selected' : ''}`}
                    onClick={() => handleIconSelect(iconName)}
                  >
                    {IconComponent && <IconComponent size={20} />}
                    <small>{iconName}</small>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 