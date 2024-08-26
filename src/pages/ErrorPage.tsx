import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import React from "react";

const ErrorPage: React.FC = (): JSX.Element => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <ExclamationTriangleIcon className="size-20 fill-red-600" />
      <h1 className="text-xl font-semibold">Error Fetching Data!</h1>
    </div>
  );
};

export default ErrorPage;
