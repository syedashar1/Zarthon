import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HelpIcon from '@material-ui/icons/Help';
import FireGram from './FireGram'
import { useSelector } from 'react-redux';
import SinglePost from './SinglePost';
import SavedPosts from './SavedPosts';
import MapLocation from './MapLocation';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import CropDinIcon from '@material-ui/icons/CropDin';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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
    width: '100%',
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);


  const userInfo = useSelector((state) => state.userSignin.userInfo);
  const user = useSelector((state) => state.getDetails.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root} style={{minHeight:'650px',fontSize:'30px'}}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          
        >
          <Tab  icon={<CropDinIcon style={{fontSize:'50px'}} />} {...a11yProps(0)} />
          <Tab  icon={<ViewModuleIcon style={{fontSize:'50px'}} />}  {...a11yProps(1)} />
          <Tab icon={<LocationOnIcon style={{fontSize:'50px'}} />} {...a11yProps(2)} />
          {userInfo._id === user._id && <Tab  icon={<BookmarkIcon style={{fontSize:'50px'}} />} {...a11yProps(3)}/>}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <div style={{padding:'0px'}}>
                <FireGram/>
        </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
                {user.posts.map( x => 
                  <div style={{marginBottom:'100px'}} >
                  <SinglePost id={user._id} postid={x._id} />
                  </div>
                        
                )}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
                <MapLocation/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
                <SavedPosts/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
