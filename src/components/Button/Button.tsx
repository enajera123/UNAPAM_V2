import { ButtonProps } from "./interface";

const Button: React.FC<ButtonProps> = ({ children, className, format, ...props }) => {

  return (
    <button
      {...props}
      type="button"
      className={`${format ? className : `text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 bg-red-gradient hover:bg-hover-red-gradient ${className}`}`}
    >
      {children}
    </button>
  );
};

export default Button;
