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
  const [allEmployees, setAllEmployees] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const containsMaybeYouMean = errorMessage.includes("maybe you mean");

  const addUnderlinesToName = (error: any) => {
    const startIndex = error.indexOf("maybe you mean") + 15; // Adding 15 to account for the length of "maybe you mean"
    const names = error.slice(startIndex);
    const namesArray = names.match(/\b\w+\b/g);
    return (
      <>
        {error.substring(0, startIndex)}
        {namesArray.map((name: string, index: number) => (
          <React.Fragment key={name}>
            <u>
              <a href={`?name=${name}`}>{name}</a>
            </u>
            {index < namesArray.length - 1 ? ", " : "?"}
          </React.Fragment>
        ))}
      </>
    );
  };
  const api = `http://localhost:9000/`;

  const fetchAllEmployee = () => {
    axios
      .get(api + "all")
      .then((res) => {
        setAllEmployees(res.data);
      })
      .catch((error) => {
        console.error("Error fetching all employees:", error);
      });
  };

  const fetchData = (name: any) => {
    axios
      .get(api + `tree/${name}`)
      .then((response) => {
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
    if (allEmployees.length == 0) {
      fetchAllEmployee();
    }
    if (name) {
      fetchData(name);
    }
  }, [name]);

  const handleSearchChange = (searchInput: string) => {
    setName(searchInput);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2>Employee App </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 10px",
          backgroundColor: "white",
          borderRadius: "10px",
          margin: "10px",
          padding: "10px",
        }}
      >
        {allEmployees?.map((em: any) => (
          <div key={em.id} style={{ flex: "0 0 calc(25% - 10px)" }}>
            {em.name}
          </div>
        ))}
      </div>
      {!name && (
        <div>
          <br></br>
          <SearchBar onSearchChange={handleSearchChange} />
        </div>
      )}
      {success && name && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <SearchBar onSearchChange={handleSearchChange} />
          <EmployeeTree data={employee} />
        </div>
      )}
      {!success && name && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <SearchBar onSearchChange={handleSearchChange} />
          {containsMaybeYouMean ? (
            <div>{addUnderlinesToName(errorMessage)}</div>
          ) : (
            <div>{errorMessage}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TreeHierarchy;
