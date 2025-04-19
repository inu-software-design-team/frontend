'use client';

import { useEffect, useState } from 'react';

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate: boolean;
  errorMessage: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  validate,
  errorMessage,
  className,
}) => {
  const [isInvalid, setIsInvalid] = useState(false);


  useEffect(() => {
    if (validate) {
      setIsInvalid(errorMessage.length > 0); 
    } else {
      setIsInvalid(false); 
    }
  }, [validate, errorMessage]);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center">
        <label className="mr-2 text-base font-semibold">{label}</label>

        {/* 에러 메시지가 있을 경우 라벨 옆에 표시 */}
        {isInvalid && (
          <p className="text-[10px] text-[#FB2C36]">{errorMessage}</p>
        )}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-2 h-9 w-full rounded-md border bg-[#F1F5F9] px-3 text-xs ${
          isInvalid
            ? 'border-[#FB2C36] text-[#121212]/38'
            : 'border-[#E2E8F0] text-[#121212]'
        } focus:ring-0 focus:outline-none`}
      />
    </div>
  );
};

export default Input;
