import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center pt-20">
        <Oval
          visible={true}
          height="60"
          width="60"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
    </div>
  );
};

export default Loader;
