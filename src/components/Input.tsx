'use client';

import { useEffect, useState } from 'react';

interface InputProps
  extends Pick<React.ComponentPropsWithoutRef<'div'>, 'className'>,
    React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  validate: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  label = '',
  type,
  placeholder,
  value,
  onChange,
  validate,
  errorMessage = '',
  className,
  ...props
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
    <div className={`flex flex-col gap-y-1 ${className ?? ''}`}>
      {(label.length > 0 || isInvalid) && (
        <div className="flex items-center">
          {label.length > 0 && (
            <label className="mr-2 text-base font-semibold">{label}</label>
          )}

          {/* 에러 메시지가 있을 경우 라벨 옆에 표시 */}
          {isInvalid && (
            <p className="text-[10px] text-[#FB2C36]">{errorMessage}</p>
          )}
        </div>
      )}
      <input
        {...props}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`shadow-border bg-secondary h-9 w-full rounded-md px-3 text-xs ${
          isInvalid
            ? 'shadow-danger text-black-off'
            : 'shadow-tertiary text-black focus:shadow-black'
        } transition-shadow focus:ring-0 focus:outline-none`}
      />
    </div>
  );
};

export default Input;
