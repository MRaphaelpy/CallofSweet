
import React from 'react';
import { NotificationsActive as NotificationIcon } from '@mui/icons-material';
import SectionContainer from './SectionContainer';
import SettingItem from './SettingItem';

const NotificationSettings = ({ settings, handleSettingChange }) => {
    return (
        <SectionContainer icon={<NotificationIcon />} title="Notificações">
            <SettingItem
                label="Notificações por e-mail"
                description="Receba atualizações sobre seus pedidos por e-mail."
                checked={settings.emailNotifications}
                onChange={handleSettingChange('emailNotifications')}
            />

            <SettingItem
                label="Notificações push"
                description="Receba alertas no navegador sobre status de pedidos."
                checked={settings.pushNotifications}
                onChange={handleSettingChange('pushNotifications')}
            />

            <SettingItem
                label="Emails de marketing"
                description="Receba promoções e novidades da Doce Sabor."
                checked={settings.marketingEmails}
                onChange={handleSettingChange('marketingEmails')}
            />
        </SectionContainer>
    );
};

export default NotificationSettings;