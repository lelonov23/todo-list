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
      </div>
    </div>
  );
}

export default Modal;
