"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import SearchBar from "./components/search-bar";
import EmployeeTree from "./components/employee-tree";

const TreeHierarchy = () => {
  const query = useSearchParams();
  const initialName = query.get("name");
  const [name, setName] = useState(initialName);
  const [employee, setEmployee] = useState([]);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = (name: any) => {
    const api = `http://localhost:9000/tree/${name}`;
    axios
      .get(api)
      .then((response) => {
        response.data.data.map((e: any) => {
          e.searchedName = name;
          return e;
        });
        setEmployee(response.data.data);
        setSuccess(response.data.success);
        setErrorMessage("");
      })
      .catch((error) => {
        setEmployee([]);
        setSuccess(false);
        setErrorMessage(error.response?.data?.message || "Error occurred.");
      });
  };

  useEffect(() => {
    fetchData(name);
  }, [name]);

  const handleSearchChange = (searchInput: string) => {
    setName(searchInput);
  };

  return (
    <>
      {!name && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchBar onSearchChange={handleSearchChange} />
        </div>
      )}
      {success && name && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <SearchBar onSearchChange={handleSearchChange} />
            <EmployeeTree data={employee} />
          </div>
        </div>
      )}
      {!success && name && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <SearchBar onSearchChange={handleSearchChange} />
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default TreeHierarchy;
