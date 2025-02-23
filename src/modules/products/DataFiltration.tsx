import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import React from "react";
import { filterOptions } from "src/constants/products";
import { IFilterOptions } from "src/interfaces/products";
import { useAppSelector } from "src/store/hooks";
import { capitalize } from "src/utils/helper";

interface Props {
  selectedFilter: string;
  setSelectedFilter: (fl: string) => void;
  selectedOption: {
    label: string;
    value: string;
  } | null; //to handle value and label different
  setSelectedOption: (op: { label: string; value: string } | null) => void; //to handle value and label different
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
    category: categories.map((c) => ({ label: c, value: c.toLowerCase() })),
  };

  // Handles when a user selects a filter category
  const handleMenuClick = (e: any) => {
    if (e.key) {
      setSelectedFilter(e.key);
    }
    setSelectedOption(null); // Reset the selected option
  };

  // The main filter categories menu
  const mainMenu: MenuProps["items"] = Object.keys(updatedOptions).map((i) => ({
    key: i,
    label: capitalize(i),
    onClick: handleMenuClick,
  }));

  // Handles the sub-menu filter option click
  const handleSubMenuClick = (e: any) => {
    if (e.key) {
      setSelectedOption({ label: e.label, value: e.key });
    }
  };

  // Submenu based on the selected filter category
  const subMenu: MenuProps["items"] = (
    updatedOptions[selectedFilter as "category" | "price" | "ratings"] || []
  ).map((s) => ({
    key: s.value,
    label: s.label,
    onClick: (e) => handleSubMenuClick({ ...e, label: s.label }),
  }));

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Dropdown menu={{ items: mainMenu }} trigger={["click"]}>
        <Button style={{ marginRight: "10px" }}>
          Filter By{!!selectedFilter ? ":" : ""}{" "}
          {capitalize(selectedFilter || "")} <DownOutlined />
        </Button>
      </Dropdown>
      <Dropdown
        menu={{ items: subMenu }}
        trigger={["click"]}
        disabled={!selectedFilter}
      >
        <Button>{selectedOption?.label || "Select Option"}</Button>
      </Dropdown>
    </div>
  );
};

export default DataFiltration;
