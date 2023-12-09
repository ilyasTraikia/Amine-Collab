"use client";
import Head from "next/head";
import Image from "next/image";
import AffectRoleModal from "./AffectClaimsModal";
import "bootstrap/dist/css/bootstrap.min.css";
// import Unauthorized from "../../components/Unauthorized";
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
import EditRoleModal from "./EditRoleModal";
import AddRoleModal from "./AddRoleModal";
import TestModal from "./TestModal";
//const App = dynamic(() => import("application/Page"), { ssr: false });
export default function Roles() {
  //const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const API_BASE_URL = "http://localhost:5000/api/";
  const MANAGE_USERS_DATAGRID_URL = `${API_BASE_URL}admin/roles/`;
  const UPDATE_ROLE_URL = `${API_BASE_URL}admin/roles`;
  const FETCH_CLAIMS_URL = `${API_BASE_URL}admin/claims`;

  const columns = [
    { label: "Id", field: "id" },
    { label: "Role Name", field: "name" },
    { label: "Role Description", field: "description" },
    { label: "NormalizedName", field: "normalizedName" },
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


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setisAddModalOpen] = useState(false);

  const [isAffectClaimsModalOpen, setIsAffectClaimsModalOpen]  = useState(false);

  const [editingRole, setEditingRole] = useState(null);
  const [creatingRole, setcreatingRole] = useState(null);
  const [isRoleEdited , setisRoleEdited] = useState(false);
  const [isRoleCreated , setisRoleCreated ] = useState(false);
  const [claims,setClaims] = useState([])
  

  const handleEdit = (role) => {
   fetchRole(role)
   setIsModalOpen(true);
  };




  const handleAffectClaims = (role) => {
    fetchRole(role)
    setIsAffectClaimsModalOpen(true)
  }







  const handleCreate = (role) => {
    setcreatingRole(role);
    setisAddModalOpen(true);
  };


  // Editing the role function
  const handleSubmitEdit = (updatedRole) => {
     console.log("Updated role is "+ JSON.stringify(updatedRole));


     const updatedRoleFromUpdatedRole = {
      name: updatedRole.name,
      description: updatedRole.description
     }

      const requestOptions = {
       method: 'PUT',
       headers: { 
         'Content-Type': 'application/json',
          Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluaXN0cmF0b3IiLCJleHAiOjE3MDA3NDczMzMsImlzcyI6IldlYkFwaSIsImF1ZCI6Imh0dHA6Ly8wLjAuMC4wOjQwMDAifQ.WfA1rgWw9Mw5yYDoHAorPqSyHN8fLusXTRW71bGl8aQ`,
        },
       body: JSON.stringify(updatedRoleFromUpdatedRole)
      };



    fetch(`${UPDATE_ROLE_URL}/${updatedRole.id}`, requestOptions)
    .then(response => {
      response.text();
      setisRoleEdited(!isRoleEdited)
    })
    .catch(err=> console.log(err))


  };





 // Function to handle the affectation of claims to roles
  const handleSubmitAffectClaims = (roleWithClaims) => {

  
    console.log("from handleSubmitAffect " + JSON.stringify(roleWithClaims))

    const RequestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluaXN0cmF0b3IiLCJleHAiOjE3MDA3NDczMzMsImlzcyI6IldlYkFwaSIsImF1ZCI6Imh0dHA6Ly8wLjAuMC4wOjQwMDAifQ.WfA1rgWw9Mw5yYDoHAorPqSyHN8fLusXTRW71bGl8aQ`,
      },
      body: JSON.stringify({ claims: roleWithClaims.claims }),
    };


    fetch(`${UPDATE_ROLE_URL}/claims/${roleWithClaims.role.role.id}`, RequestOptions)
     .then((secondData) => {
       // Handle the response of the second request.
       console.log('Second request successful:', secondData);
       setisRoleEdited(true)
      })
     .catch(err=> console.log(err))




  }









  // Creating the role function
  const handleSubmitCreate = (NewRole) => {
    console.log("New role is "+ JSON.stringify(NewRole));

    const updatedRoleFromNewRole = {
     name: NewRole.name,
     description: NewRole.description,
     claims : NewRole.claims
    }

     const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
         Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluaXN0cmF0b3IiLCJleHAiOjE3MDA3NDczMzMsImlzcyI6IldlYkFwaSIsImF1ZCI6Imh0dHA6Ly8wLjAuMC4wOjQwMDAifQ.WfA1rgWw9Mw5yYDoHAorPqSyHN8fLusXTRW71bGl8aQ`,
       },
      body: JSON.stringify(updatedRoleFromNewRole)
     };

   fetch(`${UPDATE_ROLE_URL}`, requestOptions)
   .then(response => {
     response.text();
     setisRoleCreated(true)
   })
   .catch(err=> console.log(err))
 };



  // const useAuth = require("application/useAuth").default;
  // const auth = useAuth();
  const router = useRouter();
  // if (auth == null) {

  //   return (
  //     <Unauthorized/>
  //   );
  // }

  // if (auth.status === "unauthenticated") {
  //   // Render nothing or maybe a redirecting message
  //   return (
  //       <Unauthorized/>
  //   );
  // }

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
                handleAffectClaims(item)
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








  const fetchClaims = async () => {
    try {
      const response = await fetch(
        `${FETCH_CLAIMS_URL}`,
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
      const apiData = await response.json();
      setClaims(apiData);

    } catch (error) {
      console.error(`Something went wrong: ${error}`);
      setClaims([]);
    } 
  };



  const fetchRole = (role) => {

    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
         Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluaXN0cmF0b3IiLCJleHAiOjE3MDA3NDczMzMsImlzcyI6IldlYkFwaSIsImF1ZCI6Imh0dHA6Ly8wLjAuMC4wOjQwMDAifQ.WfA1rgWw9Mw5yYDoHAorPqSyHN8fLusXTRW71bGl8aQ`,
       }
     };


     fetch(`${UPDATE_ROLE_URL}/${role.id}`, requestOptions)
     .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch the role');
      }
      return response.json(); 
    })
    .then(data => {
      setEditingRole(data);

    })
    .catch(error => {
      console.error('Error:', error);
    });



  }













  useEffect(() => {
    fetchData();
    fetchClaims();
  }, [search, currentPage,isRoleEdited,isRoleCreated]);

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
      <h1 className="h5 text-center py-5 mb-0">Roles & permissions</h1>

       <MDBCard className="m-full-hieght">
        <div >
         <MDBBtn className="float-end" onClick={()=> {
          handleCreate({
            description: null,
            id: null,
            name: null,
            normalizedName : null
          })
         }}>Add Role</MDBBtn>
        </div>
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
      <EditRoleModal
        isOpen={isModalOpen}
        setOpen={setIsModalOpen}
        role={editingRole}
        onSubmit={handleSubmitEdit}
        claims={claims}
       />

      <AddRoleModal
        isOpen={isAddModalOpen}
        setOpen={setisAddModalOpen}
        role={creatingRole}
        onSubmit={handleSubmitCreate}
       />

      <AffectRoleModal
        isOpen={isAffectClaimsModalOpen}
        setOpen={setIsAffectClaimsModalOpen}
        role={editingRole}
        onSubmit={handleSubmitAffectClaims}
        claims={claims}
      />
      <TestModal


       />
     
      
                       
    </>
  );
}
