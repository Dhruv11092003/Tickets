import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css"

const PopupComponent = ({ trigger, content }) => {
  return (
    <Popup trigger={trigger} modal className="popup-content">
      {(close) => (
        <div className="popup-inner">
          <div>{content}</div>
          <button onClick={close} className="button no-btn">
            Close
          </button>
        </div>
      )}
    </Popup>
  );
};

export default PopupComponent;
