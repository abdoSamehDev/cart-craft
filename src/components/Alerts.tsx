"use client";

import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Alert } from "flowbite-react";

export function InfoAlert(message: string) {
  return (
    <Alert color="info" className="rounded-none" icon={InformationCircleIcon}>
      {message}
    </Alert>
  );
}

("use client");

export function ErrorAlert(message: string) {
  return (
    <Alert color="failure" icon={InformationCircleIcon}>
      {message}
    </Alert>
  );
}
