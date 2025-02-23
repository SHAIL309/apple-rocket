import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import React from "react";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Category",
    children: [
      {
        key: "electronics",
        label: "Electronics",
      },
      {
        key: "jewelery",
        label: "Jewelery",
      },
      {
        key: "men's clothing",
        label: "Men's clothing",
      },
      {
        key: "women's clothing",
        label: "Women's clothing",
      },
    ],
  },
  {
    key: "2",
    label: "Price",
    children: [
      {
        key: "<50",
        label: "Under $50",
      },
      {
        key: "50-100",
        label: "50 - $100",
      },
      {
        key: "100-200",
        label: "$100 - $200",
      },
      {
        key: ">200",
        label: "Above $200",
      },
    ],
  },
  {
    key: "3",
    label: "Ratings",
    children: [
      {
        key: ">4",
        label: "4 Stars & Up",
      },
      {
        key: ">3",
        label: "3 Stars & Up",
      },
      {
        key: ">2",
        label: "2 Stars & Up",
      },
      {
        key: ">1",
        label: "1 Stars & Up",
      },
    ],
  },
];

const CascadeMenu = () => {
  return (
    <Dropdown menu={{ items }}>
      <Space>
        Filter
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};

export default CascadeMenu;
