"use client";
import Head from "next/head";
import Image from "next/image";

import "bootstrap/dist/css/bootstrap.min.css";
// import Unauthorized from "../../components/Unauthorized";
// import { Paper, Button } from "@mui/material";
import dynamic from "next/dynamic";
//import CustomCarousel from "../components/CustomCarousel";
// import { useSelector } from "react-redux";
// import Grid from "@mui/material/Grid";
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBDatatable,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import React, { useState } from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import EditUserModal from "./EditUserModal";
import AffectModal from "./AffectModal";

//const App = dynamic(() => import("application/Page"), { ssr: false });
export default function Users() {
  const API_BASE_URL = "http://localhost:5000/api/";
  const MANAGE_USERS_DATAGRID_URL = `${API_BASE_URL}admin/users/`;
  const UPDATE_USER_URL = `${API_BASE_URL}admin/users`;
  const MANAGE_ROLES_URL = `${API_BASE_URL}admin/roles/`;

  const columns = [
    { label: "Id", field: "id" },
    { label: "FullName", field: "fullName" },
    { label: "Gender", field: "gender" },
    { label: "UserName", field: "userName" },
    { label: "Email", field: "email" },
    { label: "Action", field: "action" },
  ];

  // Is data loading
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const pageSize = 10; // Set your page size

  const [search, setsearch] = useState(String);

  // const useAuth = require("application/useAuth").default;
  // const auth = useAuth();
  // const router = useRouter();
  // if (!auth || auth.status === "unauthenticated") {
  //   return <Unauthorized />;
  // }

  // const fetchData = async (page) => {
  //   setIsLoading(true);
  //   // Replace with your API call
  //   const response = await fetch(`your-api-url?page=${page}&pageSize=${pageSize}`);
  //   const data = await response.json();
  //   setData(data.items);
  //   setTotalPages(data.totalPages);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   fetchData(currentPage);
  // }, [currentPage]);

  // const handlePageClick = (page) => {
  //   setCurrentPage(page);
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAffectModalOpen, setisAffectModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isUserEdited , setIsUserEdited] = useState(false);
  const [roles, setRoles] = useState([]);

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleAffect = (user) => {
    setEditingUser(user);
    setisAffectModalOpen(true);
  };



  // Function to edit the user
  const handleSubmitEdit = (updatedUser) => {
    // Handle the submission of edited data
    // You might want to call an API to update the user data
    console.log("Updated user is " + JSON.stringify(updatedUser));
    const requestOptions = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
         Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluaXN0cmF0b3IiLCJleHAiOjE3MDA3NDczMzMsImlzcyI6IldlYkFwaSIsImF1ZCI6Imh0dHA6Ly8wLjAuMC4wOjQwMDAifQ.WfA1rgWw9Mw5yYDoHAorPqSyHN8fLusXTRW71bGl8aQ`,
       },
      body: JSON.stringify(updatedUser)
    };

    fetch(`${UPDATE_USER_URL}/${updatedUser.id}`, requestOptions)
    .then(response => {
      response.text();
      setIsUserEdited(true)
    })
    .catch(err=> console.log(err))
  };



  // Function to affect a role to a user
  const handleSubmitAffect = (updatedUser) => {
    // Handle the submission of edited data
    // You might want to call an API to update the user data
    console.log("Updated user in handleSubmitAffect is " + JSON.stringify(updatedUser));

    // mock data because endpoint does not provide them , remove these
    const ModifiedUpdatedUser = {
      ...updatedUser,
      phoneNumber:"056321458",
      adresse:"BBA"
    }

    const requestOptions = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
         Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluaXN0cmF0b3IiLCJleHAiOjE3MDA3NDczMzMsImlzcyI6IldlYkFwaSIsImF1ZCI6Imh0dHA6Ly8wLjAuMC4wOjQwMDAifQ.WfA1rgWw9Mw5yYDoHAorPqSyHN8fLusXTRW71bGl8aQ`,
       },
      body: JSON.stringify(ModifiedUpdatedUser)
    };

    fetch(`${UPDATE_USER_URL}/${updatedUser.id}`, requestOptions)
    .then(response => {
      response.text();
      setIsUserEdited(true)
    })
    .catch(err=> console.log(err))
  };




  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${MANAGE_USERS_DATAGRID_URL}?PageSize=${pageSize}&PageNumber=${currentPage}&SearchTerm=${search}`,
        {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluaXN0cmF0b3IiLCJleHAiOjE3MDA3NDczMzMsImlzcyI6IldlYkFwaSIsImF1ZCI6Imh0dHA6Ly8wLjAuMC4wOjQwMDAifQ.WfA1rgWw9Mw5yYDoHAorPqSyHN8fLusXTRW71bGl8aQ`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const pagiationData = JSON.parse(response.headers.get("x-pagination"));
      const apiData = await response.json();
      const modifiedData = apiData.map((item) => ({
        ...item,
        action: (
          <>
            <MDBBtn
              size="sm"
              floating
              className="edit-btn ms-2"
              onClick={() => {
                handleEdit(item);
              }}
            >
              {" "}
              <MDBIcon icon="edit" />{" "}
            </MDBBtn>


            <MDBBtn
              size="sm"
              floating
              className="edit-btn ms-2"
              onClick={() => {
                handleAffect(item);
              }}
            >
              {" "}
              <MDBIcon icon="add" />{" "}
            </MDBBtn>
          </>
        ),
      }));

      setData(modifiedData);
      setTotalPages(pagiationData.TotalPages);
      setTotal(pagiationData.TotalCount);
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };






  const fetchRoles = async () => {
    try {
      const response = await fetch(
        `${MANAGE_ROLES_URL}?PageSize=1000&PageNumber=1`,
        {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluaXN0cmF0b3IiLCJleHAiOjE3MDA3NDczMzMsImlzcyI6IldlYkFwaSIsImF1ZCI6Imh0dHA6Ly8wLjAuMC4wOjQwMDAifQ.WfA1rgWw9Mw5yYDoHAorPqSyHN8fLusXTRW71bGl8aQ`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const pagiationData = JSON.parse(response.headers.get("x-pagination"));
      const apiData = await response.json();
      setRoles(apiData);

    } catch (error) {
      console.error(`Something went wrong: ${error}`);
      setRoles([]);
    } 
  };






















  useEffect(() => {
    fetchData();
    fetchRoles();
  }, [search, currentPage,isUserEdited]);

  // Fetching data from Api

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setsearch(value);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    return (
      <MDBPagination className="mb-0">
        <MDBPaginationItem disabled={currentPage === 1}>
          <MDBPaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(currentPage - 1);
            }}
          >
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <MDBPaginationItem key={number} active={number === currentPage}>
            <MDBPaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(number);
              }}
            >
              {number}
            </MDBPaginationLink>
          </MDBPaginationItem>
        ))}
        <MDBPaginationItem disabled={currentPage === totalPages}>
          <MDBPaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(currentPage + 1);
            }}
          >
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    );
  };

  return (
    <>
      <h1 className="h5 text-center py-5 mb-0">User Management</h1>
      <MDBCard className="m-full-hieght">
        <MDBCardBody className="m-full-hieght">
          <MDBDatatable
            hover
            className="m-full-hieght"
            data={{ columns: columns, rows: data }}
            isLoading={isLoading}
            pagination={false}
            search={false}
            advancedSearch={(value) => {
              handleSearch(value);

              return { value, columns };
            }}
          />
          <div className="float-end ">
            {isLoading ? <p>Loading...</p> : renderPagination()}
          </div>
        </MDBCardBody>
      </MDBCard>
      <EditUserModal
        isOpen={isModalOpen}
        setOpen={setIsModalOpen}
        user={editingUser}
        onSubmit={handleSubmitEdit}
      />

      <AffectModal
            isOpen={isAffectModalOpen}
            setOpen={setisAffectModalOpen}
            user={editingUser}
            onSubmit={handleSubmitAffect}
            roles = {roles}
       />
    </>
  );
}
