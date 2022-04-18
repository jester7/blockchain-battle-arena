
export type ActionAreaProps = {
  heading: string,
    message: string,
    label: string,
    showLabel: boolean,
    showButton: boolean,
    disableButton: boolean,
    smallButton: boolean,
    isLoading: boolean,
    loadingLabel: string,
    action: () => void
}

export default function ActionArea(
  props: ActionAreaProps
) {
  
const LoadingIndicator = () => {
    if (props.isLoading) {
      return (
        <div className="loading-indicator">
          <span className="label">{props.loadingLabel}</span>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div className="section action-container">
        <h4 className={props.heading === "" ? "hidden" : "action-heading"}>{props.heading}</h4>

        <LoadingIndicator />
        <span className={(!props.showLabel || props.message === "") ? "hidden" : "action-message"}>{props.message}</span>
        <button
          className={props.showButton ? "action-button" : "action-button hidden"}
          onClick={props.action}
          disabled={props.disableButton}
        >
          {props.label}
        </button>
      </div>
    </>
  );
}

