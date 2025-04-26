const DashboardContentBox = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="shadow-drop bg-default size-full rounded-md p-8">
      {children}
    </div>
  );
};

export default DashboardContentBox;
