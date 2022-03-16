import * as classes from "./Modal.module.css";

function Modal(props: ModalProps) {
  if (!props.show) {
    return null;
  }

  return (
    <div className={classes.default.modal}>
      <div className={classes.default.modalContent}>{props.children}</div>
    </div>
  );
}

export default Modal;
