import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';
import Axios from 'axios';
import { uploadProfilePic } from '../actions/imageActions';
import { useDispatch, useSelector } from 'react-redux';

const useStorageProfilePic = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const dispatch = useDispatch();


  const getDetails = useSelector((state) => state.getDetails);
  const { user } = getDetails;

  useEffect(() => {
    // references

    const storageRef = projectStorage.ref(`POSTS/${user._id}/${file.name}`);

    // here u post on firebase
    const collectionRef = projectFirestore.collection(`${user._id}'s profile-pic`);


    console.log(collectionRef);
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      await collectionRef.add({ url, createdAt });
      dispatch( uploadProfilePic(url) )
      setUrl(url);
    });
  }, [file]);

  return { progress, url, error };
}

export default useStorageProfilePic;

