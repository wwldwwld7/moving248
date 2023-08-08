import React from 'react';
import classes from './Modal.module.css';

const Modal = ({ show, onClose, message, onConfirm }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={classes.modal}>
            <div className={classes.modal_content}>
                <div className={classes.modal_header}>
                    <span className={classes.close} onClick={onClose}>
                        &times;
                    </span>
                </div>
                <div className={classes.modal_body}>
                    <p>{message}</p>
                </div>
                <div className={classes.modal_footer}>
                    <button className={classes.modal_button} onClick={onConfirm}>
                        예
                    </button>
                    <button className={classes.modal_button} onClick={onClose}>
                        아니오
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
