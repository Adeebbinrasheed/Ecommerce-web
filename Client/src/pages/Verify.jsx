import React from "react";

const Verify = () => {
  return (
    <div className="pt-20 bg-gray-50 flex flex-col justify-center px-2">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify Account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Otp
              </label>
              <div className="mt-1">
                <input
                  className="block w-full px-3 py-2 border-gray-300 border rounded shadow-sm  focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  type="number"
                  id="name"
                  placeholder="Otp"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full h-[48px] flex justify-center py-2 px-4 border border-transparent rounded text-white font-medium bg-blue-400 hover:bg-blue-700"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify;
