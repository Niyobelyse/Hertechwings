import Footer from "../components/Footer";
import Header from "../components/Header";


export default function LoginPage() {


  return (
<>
<Header />
<div className="flex flex-col md:flex-row min-h-screen">

<div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
  <div className="max-w-md mx-auto w-full">

    <div className="mb-8">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M20 0C20 11.046 11.046 20 0 20C11.046 20 20 28.954 20 40C20 28.954 28.954 20 40 20C28.954 20 20 11.046 20 0Z"
          fill="url(#paint0_linear)"
        />

      </svg>
    </div>


    <h1 className="text-4xl font-bold mb-2 text-gray-900">Sign In</h1>






    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 mb-2">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        placeholder="Your Email Address"
        className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>

  
    <div className="mb-6">
      <label htmlFor="password" className="block text-gray-700 mb-2">
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="Your Password"
        className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>

    <button
      className="w-full rounded-lg py-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
    >
      Sign In
    </button>


    <p className="text-center mt-6 text-gray-600">
      Can't <span className="text-gray-800">log in</span>?{" "}
      <a href="#" className="text-gray-800 font-medium hover:underline">
        Sign up
      </a>
      to create an account
    </p>
  </div>
</div>


<div className="hidden md:flex w-1/2 bg-gradient-to-b from-pink-400 to-orange-300 p-12 items-center justify-center relative overflow-hidden">

  <div className="absolute top-20 right-20 w-12 h-12 border-2 border-white opacity-20 rotate-45"></div>
  <div className="absolute bottom-40 left-20 w-8 h-8 border-2 border-white opacity-20 rotate-12"></div>
  <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-white opacity-20 rounded-full"></div>

  <div className="relative z-10 text-center">
    <h2 className="text-white text-4xl font-bold mb-8 max-w-md">Turn your ideas into reality</h2>


  </div>
</div>
</div>
<Footer />
</>
  );
}
