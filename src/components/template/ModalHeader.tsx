export const ModalHeader = (props: {
  IconFontello: string;
  Title: string | JSX.Element;
  CloseButtonEnabled: boolean;
  CloseButtonFunctionality: any;
}) => {
  const {
    IconFontello,
    Title,
    CloseButtonEnabled = true,
    CloseButtonFunctionality,
  } = props;
  return (
    <div className="modal-header bg-skin-primary/70 text-white text-skin-primary/80 text-2xl font-semibold py-2 px-4 justify-between">
      <h3 className="title-tw-modal">
        {IconFontello && <i className={`${IconFontello} mr-2`}></i>}
        {Title}
      </h3>
      {CloseButtonEnabled && (
        <button
          type="button"
          className="close-tw"
          onClick={CloseButtonFunctionality}
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
};
