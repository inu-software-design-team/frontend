interface TextareaProps
  extends Omit<
      React.ComponentPropsWithoutRef<'div'>,
      'id' | 'onChange' | 'autoFocus'
    >,
    Pick<
      React.ComponentPropsWithoutRef<'textarea'>,
      | 'id'
      | 'autoFocus'
      | 'disabled'
      | 'readOnly'
      | 'required'
      | 'rows'
      | 'placeholder'
      | 'value'
      | 'minLength'
      | 'maxLength'
      | 'onChange'
    > {
  label?: string;
}

const Textarea = ({
  id,
  label = '',
  autoFocus = false,
  disabled = false,
  readOnly = false,
  required = false,
  rows = 2,
  placeholder,
  value = '',
  minLength,
  maxLength,
  onChange,
  ...props
}: TextareaProps) => {
  return (
    <div
      {...props}
      className={`space-y-1 has-disabled:cursor-not-allowed has-disabled:*:cursor-not-allowed ${props.className ?? ''}`}
    >
      {label.length > 0 && (
        <label htmlFor={id} className="block w-full font-semibold">
          {label}
        </label>
      )}
      <textarea
        id={id}
        autoFocus={autoFocus}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        rows={rows}
        placeholder={placeholder}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        onChange={onChange}
        className="placeholder:text-black-off bg-secondary shadow-border shadow-tertiary w-full rounded-md px-4 py-3 transition-shadow outline-none focus:shadow-black"
      />
    </div>
  );
};

export default Textarea;
