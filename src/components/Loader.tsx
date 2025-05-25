interface LoaderProps extends React.ComponentPropsWithoutRef<'div'> {
  isLoading: boolean;
}

const Loader = ({ isLoading, ...props }: LoaderProps) => {
  return (
    isLoading && (
      <div
        {...props}
        className={`absolute top-0 left-0 z-999 grid size-full place-items-center ${props.className ?? ''}`}
      >
        <div className="flex items-center gap-x-4">
          {Array.from({ length: 3 }, (_, i) => (
            <svg
              key={i}
              className="fill-primary dark:fill-primary-hover aspect-square w-4 animate-[opacity-bounce_1s_infinite]"
              style={{
                animationDelay: `${i * 200}ms`,
              }}
            >
              <circle cx="50%" cy="50%" r="50%" />
            </svg>
          ))}
        </div>
      </div>
    )
  );
};

export default Loader;
