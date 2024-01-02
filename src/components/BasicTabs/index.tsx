import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { CommandLine, GRBLSettings } from '../../pages';
import { styles } from './styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={styles.tabContainer}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box flex={1} height={"100%"} sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const BasicTabs = () => {
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box width="100vw" height="100vh" flexDirection="column">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: styles.tabIndicator,
          }}
        >
          <Tab style={styles.tabButton} label="Command Line" {...a11yProps(0)} />
          <Tab style={styles.tabButton} label="GRBL Settings" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={currentTab} index={0}>
        <CommandLine/>
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        <GRBLSettings />
      </CustomTabPanel>
    </Box>
  );
}