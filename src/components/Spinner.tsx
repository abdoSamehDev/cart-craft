import { Spinner } from "flowbite-react";
import React from "react";

const LoadingSpinner: React.FC = (): JSX.Element => {
  return (
    <div className="my-20 flex justify-center">
      <Spinner
        aria-label="Large spinner example"
        size="xl"
        className="fill-accent text-text"
        color=""
      />
    </div>
  );
};

export default LoadingSpinner;
