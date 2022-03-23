import * as classes from "./Modal.module.css";

function Modal(props: ModalProps) {
  if (!props.show) {
    return null;
  }

  return (
    <div className={classes.default.modal} onClick={props.onClose}>
      <div
        className={classes.default.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
        <button className={classes.default.close} onClick={props.onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
}

export default Modal;
