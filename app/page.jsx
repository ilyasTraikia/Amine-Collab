'use client'
import React, { useState ,useEffect, useMemo} from 'react';
import DashboardContainer from './host-app/containers/DashboardContainer';
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBDatatable,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink
} from "mdb-react-ui-kit";
import Users from './host-app/components/Users';
import Roles from './host-app/components/Roles';


export default function Home() {

   const API_BASE_URL = "http://localhost:5000/api/";
   const MANAGE_USERS_DATAGRID_URL = `${API_BASE_URL}admin/users/`;



  const columns= [
        { label: 'Id', field: 'id' },
        { label: 'FullName', field: 'fullName' },
        { label: 'Gender', field: 'gender' },
        { label: 'UserName', field: 'userName' },
        { label: 'Email', field: 'email' },
      ]





  // Is data loading
  const [isLoading, setIsLoading] = useState(false);

  

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const pageSize = 10; // Set your page size

  const [search, setsearch] = useState(String)









  // Fetching data from Api 
  useEffect(() => {
 
    console.log("Just fetched")
 
      fetch(MANAGE_USERS_DATAGRID_URL+"?PageSize="+pageSize+`&PageNumber=${currentPage}&SearchTerm=${search}`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluaXN0cmF0b3IiLCJleHAiOjE3MDA1ODQ3NzEsImlzcyI6IldlYkFwaSIsImF1ZCI6Imh0dHA6Ly8wLjAuMC4wOjQwMDAifQ.oGEku0DkKM-h_H9c_P9Qc2wG4f__heTqRcPPG3cRh0A`,
        },
      }).then((res) => {
    
          setIsLoading(false);
          if (res.ok) {
            const pagiationData = JSON.parse(res.headers.get("x-pagination"));
            // console.log("ilyes "+ JSON.stringify(pagiationData))
            // console.log("datapagination"+JSON.parse(res.headers.get("x-pagination")))
            if (pagiationData){

              // setPageSize(pagiationData.PageSize);
              setTotalPages(pagiationData.TotalPages);
              setTotal(pagiationData.TotalCount);
       
              
            }
       
            return res.json();
          }
          return res.json().then((apidata) => {
            let errorMessage = "Authentication failed!";
            if (apidata && apidata.error && apidata.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        })
        .then((apiData) => {
          setIsLoading(false);
  

          if (Array.isArray(apiData)) {
            setData(apiData);
     
          }
        })
        .catch((error) => {
          setData([]);
          setIsLoading(false);
          console.log(`somthing went worng !${error}`);
        });

    
  }, [isLoading,search,currentPage, pageSize]);






  // useEffect(() => {
  //   //fetchData(currentPage);
  // }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
 










  const renderPagination = () => {
    return (
      <MDBPagination className='mb-0'>
        <MDBPaginationItem disabled={currentPage === 1}>
          <MDBPaginationLink href='#' onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage - 1); }}>
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
          <MDBPaginationItem key={number} active={number === currentPage}>
            <MDBPaginationLink href='#' onClick={(e) => { e.preventDefault(); setCurrentPage(number); }}>
              {number}
            </MDBPaginationLink>
          </MDBPaginationItem>
        ))}
        <MDBPaginationItem disabled={currentPage === totalPages}>
          <MDBPaginationLink href='#' onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage + 1); }}>
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    );
  };





  return (
   <> 
           <DashboardContainer>
             <Users />
             <Roles />
          </DashboardContainer>
   </>
  );
}
