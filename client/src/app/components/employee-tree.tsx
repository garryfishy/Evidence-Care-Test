import React, { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { useSearchParams } from "next/navigation";

const EmployeeTree = ({ data }) => {
  const query = useSearchParams();
  const [name, setName] = useState(query.get("name"));

  useEffect(() => {
    setName(query.get("name"));
  }, [query]);

  const renderTreeNode = (employee) => {
    const labelStyle = {
      backgroundColor:
        employee.name === data[0].searchedName ? "#0fbcf9" : "#d2dae2",
      borderRadius: "5px",
      alignItems: "center",
      color: employee.name === data[0].searchedName ? "#ff0000" : "#596275",
      padding: "5px",
      display: "inline-block",
      border: "1px solid black",
    };

    return (
      <TreeNode
        key={employee.id}
        label={<button style={labelStyle}>{employee.name}</button>}
      >
        {employee.directReports.map(renderTreeNode)}
      </TreeNode>
    );
  };

  const rootEmployees = data.filter((employee) => !employee.managerId);
  const tree = rootEmployees.map(renderTreeNode);

  return (
    <div className="flex flex-col justify-content-center">
      <div className="flex-grow">
        <Tree
          lineWidth={"5px"}
          lineColor={"#05c46b"}
          lineBorderRadius={"15px"}
          label={<b>Organizational Chart</b>}
        >
          {tree}
        </Tree>
      </div>
    </div>
  );
};

export default EmployeeTree;
