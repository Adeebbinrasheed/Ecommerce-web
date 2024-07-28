import React from "react";

const Account = ({ user }) => {
  return (
    <div className="flex justify-center items-center pt-28">
      {user && (
        <div className="bg-blue-100 p-4 py-6 space-y-2 font-medium rounded-md border border-black">
          <h1 className="capitalize">{user.name}</h1>
          <h1>{user.email}</h1>
          <div className="flex flex-col space-y-2 px-10">
            <button className="bg-blue-500 rounded-md">Your Orders</button>
            {user.role === "admin" && (
              <button className="bg-green-500 rounded-md">Dashboard</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
