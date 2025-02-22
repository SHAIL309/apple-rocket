import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import classes from "./confirmationModal.module.scss";

interface DeleteConfirmationModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmButton: String;
  cancelButton: string;
  confirmLoading: boolean;
}

const ConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onConfirm,
  onCancel,
  title,
  message,
  cancelButton,
  confirmButton,
  confirmLoading,
}) => {
  return (
    <Modal
      open={open}
      closeIcon={null}
      onCancel={onCancel}
      onOk={onConfirm}
      confirmLoading={confirmLoading}
      title={
        <div className={classes.modalTitle}>
          <ExclamationCircleOutlined
            style={{ color: "#ff4d4f", marginRight: "10px" }}
          />
          {title}
        </div>
      }
      okButtonProps={{ className: classes.confirmBtn }}
      okText={confirmButton}
      cancelText={cancelButton}
      centered
      className={classes.deleteModal}
    >
      <p className={classes.modalContent}>{message}</p>
    </Modal>
  );
};

export default ConfirmationModal;
