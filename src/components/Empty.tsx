const Empty = ({ ...props }: React.ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      {...props}
      className={`flex size-full flex-col items-center justify-center ${props.className ?? ''}`}
    >
      <p className="opacity-off text-center">데이터가 존재하지 않습니다.</p>
    </div>
  );
};

export default Empty;
