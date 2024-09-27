import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);
  console.log(filePerc);
  console.log(fileUploadError)

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred /
          snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
          ((downloadURL) =>
            setFormData({ ...formData, avatar: downloadURL })
          );
      }
    );
  };
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef} hidden accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />

        <img
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full object-cover 
        h-24 w-24 
        hover:cursor-pointer 
        self-center mt-2'
          onClick={() => fileRef.current.click()} />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error image upload(imgage mest be less than 2 mb)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc} %`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image Uploaded Successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='username'
          className='p-3 rounded-lg border'
          id='username' />
        <input
          type='email'
          placeholder='email'
          className='p-3 rounded-lg border'
          id='email' />
        <input
          type='password'
          placeholder='password'
          className='p-3 rounded-lg border'
          id='password' />
        <button className='p-3 bg-slate-700 hover:opacity-95 disabled:opacity-80 text-white uppercase rounded-lg'>
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
