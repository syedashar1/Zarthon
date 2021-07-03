import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../actions/imageActions';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

const useStorage = (file , caption) => {
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
    const collectionRef = projectFirestore.collection(`${user._id}`);


    console.log(collectionRef);
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      const x = await collectionRef.add({ url, createdAt , caption });
      console.log(x);
      await dispatch( createPost(url , caption ) )
      setUrl(url);
    });
  }, [file]);

  return { progress, url, error };
}

export default useStorage;