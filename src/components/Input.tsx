import { useState, useEffect } from 'react';

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
  const [isInvalid, setIsInvalid] = useState(false); // 유효성 검사를 위한 상태

  // 실시간으로 유효성 검사 수행
  useEffect(() => {
    if (validate && value) {
      setIsInvalid(errorMessage.length > 0); // 에러 메시지가 있으면 유효성 검사 실패로 간주
    } else {
      setIsInvalid(false); // 에러 메시지가 없으면 유효성 검사 성공
    }
  }, [value, validate, errorMessage]);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center">
        <label className="font-semibold text-base mr-2">{label}</label>

        {/* 에러 메시지가 있을 경우 라벨 옆에 표시 */}
        {isInvalid && (
          <p className="text-[#FB2C36] text-[10px]">{errorMessage}</p>
        )}
      </div>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`text-xs bg-[#F1F5F9] border w-full h-9 rounded-md px-3 mt-2 ${
          isInvalid ? 'border-[#FB2C36] text-[#121212]/40' : 'border-[#E2E8F0] text-[#121212]'
        } focus:outline-none focus:ring-0`}
      />
    </div>
  );
};

export default Input;
