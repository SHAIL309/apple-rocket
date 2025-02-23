import React from "react";
import { Modal, Button, Typography, Rate, Image } from "antd";
import classes from "./productDetailsModal.module.scss";
import { IProduct } from "src/interfaces/products";

interface ProductModalProps {
  data: IProduct | null;
  open: boolean;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductModalProps> = ({
  data,
  open,
  onClose,
}) => {
  if (!data) {
    return null; // If no product data, return nothing.
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      className={classes.productModal}
      closeIcon={
        <Button onClick={onClose} className={classes.productModalCloseButton}>
          Close
        </Button>
      }
    >
      <div className={classes.productModalContent}>
        <Image
          src={data.image}
          alt={data.title}
          className={classes.productModalImage}
          wrapperClassName={classes.productModalImageWrapper}
        />
        <div className={classes.productModalDetails}>
          <Typography.Title level={3} className={classes.productModalTitle}>
            {data.title}
          </Typography.Title>
          <Typography.Text className={classes.productModalCategory}>
            Category: {data.category}
          </Typography.Text>
          <Typography.Text className={classes.productModalPrice}>
            Price: ${data.price}
          </Typography.Text>

          <div className={classes.productModalDescription}>
            <Typography.Paragraph>{data.description}</Typography.Paragraph>
          </div>

          <div className={classes.productModalRating}>
            <Rate disabled defaultValue={data.rating.rate} />
            <span className={classes.productModalRatingCount}>
              ({data.rating.count} reviews)
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
