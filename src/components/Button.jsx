const Button = ({
  text,
  onClick,
  icon = null,
  iconPosition = 'left', 
  variant = 'default',
  size = 'md',
}) => {
  const variantClasses = {
    primary: 'bg-[#2C99E2] cursor-pointer text-white font-semibold border border-[#2C99E2] hover:bg-[#2C99E2]/80',
    default: 'bg-white cursor-pointer text-[#49719C] font-semibold border border-[#49719C] hover:bg-gray-100',
  };

  const sizeClasses = {
    sm: 'px-4 py-1.5 ',
    md: 'w-45 px-4 py-2.5 ',
    lg: 'w-full px-4 py-2.5 ',
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-md ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {icon && iconPosition === 'left' && <span className="flex items-center mr-3">{icon}</span>}
      <span>{text}</span>
      {icon && iconPosition === 'right' && <span className="flex items-center ml-3">{icon}</span>}
    </button>
  );
};

export default Button;
