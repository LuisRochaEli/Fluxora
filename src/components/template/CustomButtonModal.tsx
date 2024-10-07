export const CustomButtonModal = (props: {
  FunctionOnClick: () => void;
  Icon: JSX.Element;
  Title: string;
}) => {
  const { FunctionOnClick, Icon, Title } = props;
  return (
    <>
      <button
        className="flex gap-x-1 btn btn-tw-primary text-sm items-center py-1"
        onClick={FunctionOnClick}
      >
        {Icon}
        <span>{Title}</span>
      </button>
    </>
  );
};
