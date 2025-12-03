const LoginForm = ({ isloading, setLoginCredentials, sendLoginRequest }) => {
  return (
    <form
      className=" max-md:absolute max-md:inset-0 max-md:w-screen relative md:mx-2 max-md:justify-center max-lg:min-w-[45%] lg:w-[450px] backdrop-blur-2xl overflow-hidden  md:border-blue-300/40 border-t-4 p-10 
 md:rounded-3xl flex flex-col gap-4 w-80"
    >
      <h1 className="md:hidden absolute top-0 right-0 text-gray-400 font-semibold p-10 text-2xl">
        Izacu
      </h1>
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-0 via-transparent to-blue-300/20 pointer-events-none " />
      <div className="">
        <p className="font-bold text-2xl md:text-3xl text-transparent bg-gradient-to-r from-white/90 to-blue-500 bg-clip-text">
          WELCOME BACK!
        </p>
        <p className="text-gray-500 text-sm my-3">
          Today is a new day. it's your day. you shape it Sign in to start
          managing your projects
        </p>
      </div>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/3 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
          />
        </svg>
        <input
          onChange={(e) =>
            setLoginCredentials((prev) => ({ ...prev, email: e.target.value }))
          }
          className="text-white outline-none mt-2 w-full pl-10 placeholder:font-medium active:border-blue-700 focus:border-blue-700 rounded-2xl px-4 text-md placeholder-gray-400 p-3   bg-blue-500/20 "
          type="text"
          placeholder="Email Address"
        />
      </div>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <input
          onChange={(e) =>
            setLoginCredentials((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          className="text-white outline-none mt-2 w-full pl-10 placeholder:font-medium active:border-blue-700 focus:border-blue-700 rounded-2xl px-4 text-md placeholder-gray-400 p-3   bg-blue-500/20 "
          type="password"
          placeholder="Password"
        />
      </div>
      <button
        onClick={(event) => sendLoginRequest(event)}
        className="bg-gradient-to-b from-blue-400 to-blue-500 my-4 rounded-3xl p-3 text-white font-semibold cursor-pointer hover:bg-blue-500 transition-all"
      >
        Login
      </button>
      {isloading && (
        <div className="flex items-center justify-center ">
          <div className="animate-spin  shadow-blue-300 border-gray-400/40 border-4 rounded-full inline-block w-10 h-10 border-t-4 border-l-4 border-dashed  border-t-blue-500"></div>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
