import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold uppercase text-slate-800 my-7">Sign in</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 uppercase text-white font-semibold p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className='flex gap-2 my-5'>
        <p>New User ? </p>
        <Link to='/signup'>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
    </div>
  )
}
