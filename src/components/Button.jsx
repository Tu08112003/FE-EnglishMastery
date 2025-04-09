const Button = ({ text, variant = 'default', size = 'md' }) => {
  const variantClasses = {
    primary: 'bg-[#2C99E2] text-white font-semibold border border-[#2C99E2] hover:bg-[#2C99E2]/80',
    default: 'bg-white text-[#49719C] font-semibold border border-[#49719C] hover:bg-gray-100',
  };

  const sizeClasses = {
    sm: ' px-4 py-1.5',
    md: 'w-45 px-4 py-2.5',
    lg: 'w-full px-4 py-2.5',
  };

  return (
    <button className={`rounded-md ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {text}
    </button>
  );
};

export default Button;
