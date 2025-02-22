import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { filterOptions } from "src/constants/products";
import { IFilterOptions } from "src/interfaces/products";
import { useAppSelector } from "src/store/hooks";

interface Props {
  selectedFilter: string;
  setSelectedFilter: (fl: string) => void;
  selectedOption: string;
  setSelectedOption: (op: string) => void;
}

const DataFiltration: React.FC<Props> = ({
  setSelectedOption,
  selectedOption,
  setSelectedFilter,
  selectedFilter,
}) => {
  const { categories } = useAppSelector((state) => state.products);

  const updatedOptions: IFilterOptions = {
    ...filterOptions,
    category: categories,
  };

  // Handles when a user selects a filter category
  const handleMenuClick = (e: any) => {
    setSelectedFilter(e.key);
    setSelectedOption(""); // Reset the selected option
  };

  // Handles the sub-menu filter option click
  const handleSubMenuClick = (e: any) => {
    setSelectedOption(e.domEvent.target.textContent);
  };

  // The main filter categories menu
  const mainMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="category">Category</Menu.Item>
      <Menu.Item key="price">Price</Menu.Item>
    </Menu>
  );

  // Submenu based on the selected filter category
  const subMenu = (
    <Menu onClick={handleSubMenuClick}>
      {(
        updatedOptions[selectedFilter.toLowerCase() as "category" | "price"] ||
        []
      ).map((option: any, index: number) => (
        <Menu.Item key={index}>{option}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Dropdown overlay={mainMenu} trigger={["click"]}>
        <Button style={{ marginRight: "10px" }}>
          Filter By: {selectedFilter} <DownOutlined />
        </Button>
      </Dropdown>
      <Dropdown
        overlay={subMenu}
        trigger={["click"]}
        disabled={!selectedFilter}
      >
        <Button>{selectedOption || "Select Option"}</Button>
      </Dropdown>
    </div>
  );
};

export default DataFiltration;
