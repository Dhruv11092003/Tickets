import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const PopupComponent = ({ trigger, content }) => {
  return (
    <Popup trigger={trigger} modal>
      {(close) => (
        <div className="popup-inner">
          {content}
          <button onClick={close} className="popup-close-btn">
            Close
          </button>
        </div>
      )}
    </Popup>
  );
};

export default PopupComponent;
