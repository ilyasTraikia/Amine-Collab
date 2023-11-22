import React, {useState} from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdb-react-ui-kit";

export default function AffectModal({ isOpen, setOpen, user, onSubmit ,roles}) {

 const [roleId, setroleId] = useState("")

  const INITIAL_FORM_STATE = {
    fullName: user?.fullName || "",
    email: user?.email || "",
    gender: user?.gender || "",
    phoneNumber : user?.phoneNumber || "",
    adresse : user?.adresse || "",
    role : user?.profileName // Add gender field
 
  };

  const FORM_VALIDATION = Yup.object().shape({
    role: Yup.string().required("Role is required"),
  });

  const handleFormSubmit = (values) => {
    onSubmit(
      {...values,
        id:user.id,
        role : roleId
      }
      );
    setOpen(false);
  };

  return (
    <MDBModal open={isOpen} setOpen={setOpen} tabIndex="-1">
      <MDBModalDialog size="lg">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Affect role</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={() => setOpen(false)}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <Formik
              initialValues={INITIAL_FORM_STATE}
              validationSchema={FORM_VALIDATION}
              onSubmit={handleFormSubmit}
              enableReinitialize
            >
              {({ handleChange, setFieldValue, values }) => (
       
                <Form>
              
  
                  {/* Role Dropdown */}
                  <MDBDropdown className='mb-3' onClick={(e)=> {e.preventDefault()}}>
                    <MDBDropdownToggle color='primary'>Select Role</MDBDropdownToggle>
                    <MDBDropdownMenu>
                       {roles.map((role)=> {
                         const RoleObject = { roleId:role.id,roleName:role.name }
                         return <>
                                   <MDBDropdownItem
                                    link 
                                    onClick={
                                      () => {setFieldValue('role',role.name);setroleId(role.id)}}>{role.name}</MDBDropdownItem>
                                </>
                       })}
                     
                     
                    </MDBDropdownMenu>
                  </MDBDropdown>
                  {/* Display selected gender */}
                  <div className="mb-3">Selected Role: {values.role}</div>
                  {/* Add other fields as necessary */}
                  <MDBModalFooter>
                    <MDBBtn outline color='danger' onClick={() => setOpen(false)} >
                      Close
                    </MDBBtn>
                    <MDBBtn type="submit" className="m-mazars-btn">
                     Save changes
                    </MDBBtn>
                  </MDBModalFooter>
                </Form>
              )}
            </Formik>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
