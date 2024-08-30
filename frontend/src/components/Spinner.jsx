import React from 'react';
import { VscLoading } from "react-icons/vsc";

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <VscLoading className="animate-spin text-sky-600 text-6xl" />
    </div>
  );
};

export default Spinner;