"use client";
import React, { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const EmployeeTree = ({ data }) => {
  const [employee, setEmployee] = useState();
  // const params = useParams();
  const searchParams = useSearchParams();

  const name = searchParams.get("name");

  useEffect(() => {
    console.log(name, "<< ini params");
    const apiUrl = `http://localhost:9000/tree/${name}`;
    axios
      .get(apiUrl)
      .then((e) => {
        console.log(e.data, "eror");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [employee]);
  const renderTreeNode = (employee: any) => {
    const labelStyle = {
      backgroundColor: "transparent",
      borderRadius: "5px",
      alignItems: "center",
      color: employee.name === "lori" ? "red" : "black",
    };

    return (
      <TreeNode
        key={employee.id}
        label={<div style={labelStyle}>{employee.name}</div>}
      >
        {employee.directReports.map(renderTreeNode)}
      </TreeNode>
    );
  };

  const rootEmployees = data.filter((employee) => !employee.managerId);
  const tree = rootEmployees.map(renderTreeNode);

  return (
    <Tree
      lineWidth={"2px"}
      lineColor={"green"}
      lineBorderRadius={"10px"}
      label={<b>Organizational Chart</b>}
    >
      {tree}
    </Tree>
  );
};

const TreeHierarchy = () => {
  const dummy = {
    success: false,
    message:
      "Cannot get hierarchy. tressa have multiple managers; tabitha, lori. linton have multiple managers; fletcher, tabitha",
    data: [
      {
        id: 1,
        name: "lori",
        managerId: null,
        foundEmployee: false,
        directReports: [
          {
            id: 2,
            name: "fletcher",
            managerId: 1,
            foundEmployee: false,
            directReports: [
              {
                id: 4,
                name: "linton",
                managerId: 2,
                foundEmployee: false,
                directReports: [],
              },
            ],
          },
          {
            id: 3,
            name: "tabitha",
            managerId: 1,
            foundEmployee: false,
            directReports: [
              {
                id: 5,
                name: "tressa",
                managerId: 3,
                foundEmployee: true,
                directReports: [],
              },
              {
                id: 4,
                name: "linton",
                managerId: 3,
                foundEmployee: false,
                directReports: [],
              },
            ],
          },
          {
            id: 5,
            name: "tressa",
            managerId: 1,
            foundEmployee: true,
            directReports: [],
          },
        ],
      },
      {
        id: 8,
        name: "tressa",
        managerId: 0,
        foundEmployee: false,
        directReports: [],
      },
      {
        id: 9,
        name: "linton",
        managerId: 0,
        foundEmployee: false,
        directReports: [],
      },
    ],
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <EmployeeTree data={dummy.data} />
    </div>
  );

  return;
};

export default TreeHierarchy;
