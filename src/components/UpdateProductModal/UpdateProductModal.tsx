import React, { useState, useEffect } from "react";
import { Modal, Input, Button, message } from "antd";
import classes from "./updateProductModal.module.scss";
import { IProduct } from "src/interfaces/products";

interface UpdateProductModalProps {
  open: boolean;
  onClose: () => void;
  productData: IProduct | null;
  onUpdate: (updatedProduct: IProduct) => void;
  confirmLoading: boolean;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  open = false,
  onClose,
  productData,
  onUpdate,
  confirmLoading = false,
}) => {
  const [updatedProduct, setUpdatedProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    if (productData) {
      setUpdatedProduct({ ...productData });
    }
  }, [productData]);

  const handleChange = (field: string, value: string) => {
    if (updatedProduct) {
      setUpdatedProduct({ ...updatedProduct, [field]: value });
    }
  };

  const handleUpdate = () => {
    if (updatedProduct) {
      // Validate and update the product
      if (
        !updatedProduct.title ||
        !updatedProduct.price ||
        !updatedProduct.description ||
        !updatedProduct.category
      ) {
        message.error("Please fill all fields");
        return;
      }

      // Call the onUpdate function passed via props to handle the update
      onUpdate(updatedProduct);
    }
  };

  return (
    <Modal
      title="Update Product"
      closeIcon={null}
      open={open}
      onCancel={onClose}
      footer={null}
      className={classes.updateModal}
      confirmLoading={confirmLoading}
    >
      <div className={classes.modalContent}>
        <div className={classes.formGroup}>
          <label>Product Title</label>
          <Input
            value={updatedProduct?.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter product title"
          />
        </div>

        <div className={classes.formGroup}>
          <label>Product Price</label>
          <Input
            value={updatedProduct?.price}
            onChange={(e) => handleChange("price", e.target.value)}
            type="number"
            placeholder="Enter product price"
          />
        </div>

        <div className={classes.formGroup}>
          <label>Product Description</label>
          <Input.TextArea
            value={updatedProduct?.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter product description"
            rows={4}
          />
        </div>

        <div className={classes.formGroup}>
          <label>Product Category</label>
          <Input
            value={updatedProduct?.category}
            onChange={(e) => handleChange("category", e.target.value)}
            placeholder="Enter product category"
          />
        </div>

        <div className={classes.modalFooter}>
          <Button onClick={onClose} style={{ marginRight: "10px" }}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleUpdate}
            className={classes.updateButton}
          >
            Update Product
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateProductModal;
