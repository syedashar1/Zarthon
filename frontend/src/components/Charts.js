import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

export default function FullWidthTabs({beginner , standard , premium}) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root} id='chart'>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <h1>{beginner.title}</h1>
            <h3>{beginner.desc}</h3>
            <b>{beginner.delivery}</b>
            <b>{beginner.revisions}</b>
            <p>{beginner.offers.map(x=><p>{x}</p>)}</p>
            <h1><b>{beginner.price}</b></h1>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <h1>{standard.title}</h1>
            <h3>{standard.desc}</h3>
            <b>{standard.delivery}</b>
            <b>{standard.revisions}</b>
            <p>{standard.offers.map(x=><p>{x}</p>)}</p>
            <h1><b>{standard.price}</b></h1>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            <h1>{premium.title}</h1>
            <h3>{premium.desc}</h3>
            <b>{premium.delivery}</b>
            <b>{premium.revisions}</b>
            <p>{premium.offers.map(x=><p>{x}</p>)}</p>
            <h1><b>{premium.price}</b></h1>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}