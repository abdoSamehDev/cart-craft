import { Button } from "flowbite-react";

type Props = {
  size?: string;
  loading?: boolean;
  icon?: JSX.Element;
  label?: string;
  title?: string;
  className?: string;
  onClick?: () => void;
};

export const MainButton = ({
  size = "md",
  loading = false,
  icon,
  label = "",
  className = "",
  onClick,
}: Props) => {
  return (
    <Button
      size={size}
      isProcessing={loading}
      className={`w-full items-center bg-primary text-secondary transition-all duration-75 hover:text-white ${className}`}
      color=""
      onClick={onClick}
    >
      {icon}
      {label}
    </Button>
  );
};

export const SecondaryButton = ({
  size = "md",
  loading = false,
  icon,
  label: child = "",
  onClick,
}: Props) => {
  return (
    <Button
      size={size}
      isProcessing={loading}
      className="w-full items-center border-2 border-primary bg-transparent text-white transition-all duration-75  hover:border-secondary hover:bg-accent hover:text-secondary"
      color=""
      onClick={onClick}
    >
      {icon}
      {child}
    </Button>
  );
};

export const IconButton = ({
  size = "sm",
  loading = false,
  icon,
  title,
  onClick,
}: Props) => {
  return (
    <Button
      title={title}
      size={size}
      isProcessing={loading}
      color=""
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};
