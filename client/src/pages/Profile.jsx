import { useSelector } from 'react-redux'

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt='profile'
          className='rounded-full object-cover 
        h-24 w-24 
        hover:cursor-pointer 
        self-center mt-2'/>
        <input
        type='text'
        placeholder='username'
        className='p-3 rounded-lg border'
        id='username'/>
        <input
        type='email'
        placeholder='email'
        className='p-3 rounded-lg border'
        id='email'/>
        <input
        type='password'
        placeholder='password'
        className='p-3 rounded-lg border'
        id='password'/>
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
