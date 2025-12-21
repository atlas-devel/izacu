const LoginForm = ({ isloading, setLoginCredentials, sendLoginRequest }) => {
  return (
    <form
      onSubmit={sendLoginRequest}
      className="fixed inset-0 flex h-full w-full flex-col justify-center gap-4 overflow-hidden backdrop-blur-2xl p-6 sm:p-8 md:relative md:inset-auto md:mx-auto md:h-auto md:max-w-md md:justify-start md:rounded-3xl md:border-t-4 md:border-blue-300/40 md:p-10 lg:max-w-lg"
    >
      {/* Mobile logo/title */}
      <h1 className="absolute right-4 top-4 text-xl font-semibold text-gray-400 sm:right-6 sm:top-6 sm:text-2xl md:hidden">
        Izacu
      </h1>

      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-300/20" />

      {/* Header */}
      <div className="relative z-10">
        <p className="bg-gradient-to-r from-white/90 to-blue-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
          WELCOME BACK!
        </p>
        <p className="my-3 text-sm text-gray-500 sm:text-base">
          Today is a new day. It’s your day. You shape it. Sign in to start
          managing your projects.
        </p>
      </div>

      {/* Email */}
      <div className="relative z-10 w-full">
        <svg
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
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
          type="email"
          placeholder="Email Address"
          onChange={(e) =>
            setLoginCredentials((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          className="mt-2 w-full rounded-2xl bg-blue-500/20 p-3 pl-10 text-white outline-none placeholder:font-medium placeholder:text-gray-400 focus:border-blue-700"
        />
      </div>

      {/* Password */}
      <div className="relative z-10 w-full">
        <svg
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
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
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setLoginCredentials((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          className="w-full rounded-2xl bg-blue-500/20 p-3 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:font-medium placeholder:text-gray-400 focus:border-blue-700 sm:text-base"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isloading}
        className="my-4 w-full cursor-pointer rounded-3xl bg-gradient-to-b from-blue-400 to-blue-500 p-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isloading ? "Logging in..." : "Login"}
      </button>

      {/* Loader */}
      {isloading && (
        <div className="z-10 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-400/40 border-t-blue-500 shadow-blue-300" />
        </div>
      )}
    </form>
  );
};

export default LoginForm;
