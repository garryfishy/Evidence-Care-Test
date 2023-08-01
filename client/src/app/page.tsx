"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const SearchBar = dynamic(() => import("./components/search-bar"));
const EmployeeTree = dynamic(() => import("./components/employee-tree"));

const TreeHierarchy = () => {
  const query = useSearchParams();
  const initialName = query.get("name");
  const [name, setName] = useState(initialName);
  const [allEmployees, setAllEmployees] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState("correct");

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
            <button
              onClick={() => {
                handleNameClick(name);
              }}
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                textDecoration: "none",
              }}
            >
              <u>
                <span>{name}</span>
              </u>
            </button>
            {index < namesArray.length - 1 ? ", " : "?"}
          </React.Fragment>
        ))}
      </>
    );
  };
  const api = `http://localhost:9000/`;

  const fetchAllEmployee = () => {
    axios
      .get(api + `all/${filter}`)
      .then((res) => {
        setAllEmployees(res.data);
      })
      .catch((error) => {
        console.error("Error fetching all employees:", error);
      });
  };

  const fetchData = (name: any) => {
    axios
      .get(api + `tree/${filter}/${name}`)
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

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  const handleNameClick = (name: string) => {
    setName(name);
  };

  useEffect(() => {
    fetchAllEmployee();
  }, [filter]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (allEmployees.length === 0) {
        fetchAllEmployee();
      }
      if (name) {
        fetchData(name);
      }
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
      {filter + " "} employees
      <div style={{ margin: "20px 0" }}>
        <button
          onClick={(e) => {
            handleFilter("correct");
          }}
          style={{ margin: "5px" }}
        >
          Correct Examples
        </button>
        <button
          onClick={(e) => {
            handleFilter("faulty");
          }}
          style={{ margin: "5px" }}
        >
          Faulty Examples 1
        </button>
        <button
          onClick={(e) => {
            handleFilter("anotherfaulty");
          }}
          style={{ margin: "5px" }}
        >
          Faulty Examples 2
        </button>
      </div>
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
