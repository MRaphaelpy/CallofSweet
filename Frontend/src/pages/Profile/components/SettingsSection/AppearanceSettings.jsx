
import React from 'react';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import SectionContainer from './SectionContainer';
import SettingItem from './SettingItem';

const AppearanceSettings = ({ settings, handleSettingChange }) => {
    return (
        <SectionContainer icon={<VisibilityIcon />} title="Aparência">
            <SettingItem
                label="Modo escuro"
                description="Alterne entre tema claro e escuro."
                checked={settings.darkMode}
                onChange={handleSettingChange('darkMode')}
            />
        </SectionContainer>
    );
};

export default AppearanceSettings;