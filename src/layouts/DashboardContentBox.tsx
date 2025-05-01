const DashboardContentBox = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      {...props}
      className={`shadow-drop bg-default sticky top-16 left-0 flex h-[calc(100vh-4rem-8rem)] w-full flex-col gap-12 rounded-md p-8 ${props.className ?? ''}`}
    >
      {children}
    </div>
  );
};

export default DashboardContentBox;
