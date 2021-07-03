import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router';

const ProgressBar = ({ file, setFile , caption , setcaption }) => {
  const { progress, url } = useStorage(file , caption ) ;
  const history = useHistory()

  useEffect(() => {
    if (url) {
      setFile(null)
      setcaption(null)
      history.push('/')
      console.log(caption);
    }
  }, [url, setFile , setcaption ]);

  return (
    <motion.div className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
} 

export default ProgressBar;