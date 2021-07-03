import React, { useEffect } from 'react';
import useStorageProfilePic from '../hooks/useStorageProfilePic';
import { motion } from 'framer-motion';

const ProgressBarProfilePic = ({ file, setFile }) => {
  const { progress, url } = useStorageProfilePic(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <motion.div className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
} 

export default ProgressBarProfilePic;
