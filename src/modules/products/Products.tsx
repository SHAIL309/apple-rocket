import React, { useMemo, useState } from "react";
import { Button, Popover, Space, Table } from "antd";
import classes from "./products.module.scss";
import { P_COLUMNS, ACTION_BUTTON } from "src/constants/products";
import { useAppSelector, useStoreActions } from "src/store/hooks";
import { IProduct } from "src/interfaces/products";
import { ProductDetailsModal } from "src/components/ProductDetailsModal";
import { ConfirmationModal } from "src/components/ConfirmationModal";
import { deleteProduct, updateProduct } from "src/store/actions";
import { UpdateProductModal } from "src/components/UpdateProductModal";
import Search from "antd/es/input/Search";
import { useWindowSize } from "src/utils/useWindowSize";
import DataFiltration from "./DataFiltration";
import { Notification } from "src/components/Notification";
import { NotificationProps } from "src/components/Notification/Notification";

const Products = () => {
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );
  const { products, loading } = useAppSelector((state) => state.products);
  const actions = useStoreActions({ updateProduct, deleteProduct });

  const { isMobile, width = 0 } = useWindowSize();

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<{ data: IProduct; type: string } | null>(
    null
  );
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: string;
  } | null>(null); //to handle value and label different

  const handleModalClose = () => {
    setModal(null);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleView = (record: IProduct) => {
    setModal({ data: record, type: "view" });
  };

  const handleUpdate = (record: IProduct) => {
    setModal({ data: record, type: "update" });
  };

  const handleDelete = (record: IProduct) => {
    setModal({ data: record, type: "delete" });
  };

  const columnsWithActions = [
    ...P_COLUMNS,
    {
      title: "Product Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
      render: (text: any) => (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "300px",
          }}
        >
          <Popover content={text}>{text}</Popover>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text: any, record: any) => (
        <Space size="small">
          {ACTION_BUTTON.map(({ id, label }) => {
            const buttonClass = (id: number) => {
              const buttonClassMap: Record<number, string> = {
                1: classes.viewButton,
                2: classes.updateButton,
                3: classes.deleteButton,
              };
              return buttonClassMap[id] || "";
            };
            return (
              <Button
                key={id}
                className={buttonClass(id)}
                onClick={() => {
                  switch (id) {
                    case 1:
                      handleView(record);
                      break;
                    case 2:
                      handleUpdate(record);
                      break;
                    case 3:
                      handleDelete(record);
                      break;
                    default:
                      break;
                  }
                }}
              >
                {label}
              </Button>
            );
          })}
        </Space>
      ),
    },
  ];

  const getModal = () => {
    switch (modal?.type) {
      case "update":
        return (
          <UpdateProductModal
            confirmLoading={loading}
            open={modal.type === "update"}
            onClose={handleModalClose}
            productData={modal.data}
            onUpdate={(updated_data) => {
              actions.updateProduct({
                data: updated_data,
                cb: () => {
                  setNotification({
                    type: "success",
                    message: "Updated successfully ",
                  });
                  handleModalClose();
                },
              });
            }}
          />
        );
      case "delete":
        return (
          <ConfirmationModal
            confirmLoading={loading}
            open={modal.type === "delete"}
            onConfirm={() => {
              actions.deleteProduct({
                data: modal.data.id,
                cb: () => {
                  setNotification({
                    type: "success",
                    message: "Deleted successfully",
                  });
                  handleModalClose();
                },
              });
            }}
            onCancel={handleModalClose}
            title={"Confirm Deletion"}
            message={
              "Are you sure you want to delete this item? This action cannot be undone."
            }
            confirmButton={"Delete"}
            cancelButton={"Cancel"}
          />
        );
      case "view":
        return (
          <ProductDetailsModal
            data={modal.data}
            open={modal.type === "view"}
            onClose={handleModalClose}
          />
        );
    }
  };

  const dataSource = useMemo(() => {
    if (!!search) {
      return products.filter((p) => p.title.includes(search));
    }
    if (!!selectedFilter && !!selectedOption) {
      switch (selectedFilter) {
        case "category":
          return products.filter((p) => p.category === selectedOption.value);
        case "ratings":
          return products.filter(
            (p) => p.rating.rate > parseInt(selectedOption.value)
          );
        case "price":
          return products.filter((p) => {
            const range = selectedOption.value.split("-");
            return !!range[1]
              ? p.price > parseInt(range[0]) && p.price < parseInt(range[1]) //if upper and lower limit is available
              : p.price > parseInt(range[0]); // if only lower limit is available
          });
      }
    }
    return products;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, search, selectedOption]);

  return (
    <div className={classes.container}>
      <div className={classes.filterWrapper}>
        <Search
          placeholder="Search product..."
          onChange={(e) => {
            setSelectedFilter("");
            setSelectedOption(null);
            setSearch(e.target.value);
          }}
          className={classes.search}
        />
        <DataFiltration
          selectedFilter={selectedFilter}
          setSelectedFilter={(fl) => {
            setSelectedFilter(fl);
          }}
          setSelectedOption={(op) => {
            setSelectedOption(op);
          }}
          selectedOption={selectedOption}
        />
      </div>
      <Table
        columns={columnsWithActions}
        dataSource={dataSource}
        rowKey="id"
        bordered
        tableLayout="auto"
        pagination={false}
        scroll={{
          y: isMobile ? 400 : width > 780 && width <= 1024 ? 450 : 500,
        }}
        onScroll={() => {}}
      />
      {!!modal && <>{getModal()}</>}
      {!!notification && <Notification {...notification} />}
    </div>
  );
};

export default Products;
