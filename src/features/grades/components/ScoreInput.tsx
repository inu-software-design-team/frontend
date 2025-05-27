'use client';

import { useEffect, useState } from 'react';

import { Input } from 'components';

interface ScoreInputProps {
  initialValue: number;
  onChange: (value: number) => void;
}

const ScoreInput = ({ initialValue, onChange }: ScoreInputProps) => {
  const [modifiedValue, setModifiedValue] = useState(initialValue);

  useEffect(() => {
    setModifiedValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      min={0}
      max={100}
      value={modifiedValue}
      validate
      className="absolute top-1/2 left-1/2 w-full -translate-1/2 *:text-center *:text-base"
      onChange={e => {
        const value = Number(e.target.value);

        if (isNaN(value) || value < 0 || value > 100) return;
        setModifiedValue(value);
        onChange(value);
      }}
    />
  );
};

export default ScoreInput;
