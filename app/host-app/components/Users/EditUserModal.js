import React from "react";
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

export default function EditUserModal({ isOpen, setOpen, user, onSubmit }) {

  const INITIAL_FORM_STATE = {
    fullName: user?.fullName || "",
    email: user?.email || "",
    gender: user?.gender || "",
    phoneNumber : user?.phoneNumber || "",
    adresse : user?.adresse || "" // Add gender field
    // ... add other fields as necessary
  };

  const FORM_VALIDATION = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    gender: Yup.string().required("Gender is required"), // Add gender validation
    // ... add other validations as necessary
  });

  const handleFormSubmit = (values) => {
    onSubmit(
      {...values,
        id:user.id,
        role : "ddfe4a21-4e51-470c-a2f5-1a4acc38edd7"
      }
      );
    setOpen(false);
  };

  return (
    <MDBModal open={isOpen} setOpen={setOpen} tabIndex="-1">
      <MDBModalDialog size="lg">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Edit User</MDBModalTitle>
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
                  <MDBInput
                    label="Full Name"
                    id="fullName"
                    name="fullName"
                    type="text"
                    onChange={handleChange}
                    value={values.fullName}
                    className="mb-3"
                  />
                  <MDBInput
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={values.email}
                    className="mb-3"
                  />
                      <MDBInput
                    label="Phone"
                    id="phoneNumber"
                    name="phoneNumber"
                    type='tel'
                    onChange={handleChange}
                    value={values.phoneNumber}
                    className="mb-3"
                  />
                      <MDBInput
                    label="Adresse"
                    id="adresse"
                    name="adresse"
                    type="text"
                    onChange={handleChange}
                    value={values.adresse}
                    className="mb-3"
                  />
                  {/* Gender Dropdown */}
                  <MDBDropdown className='mb-3' onClick={(e)=> {e.preventDefault()}}>
                    <MDBDropdownToggle color='primary'>Select Gender</MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link onClick={() => setFieldValue('gender', 'Man')}>Man</MDBDropdownItem>
                      <MDBDropdownItem link onClick={() => setFieldValue('gender', 'Woman')}>Woman</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                  {/* Display selected gender */}
                  <div className="mb-3">Selected Gender: {values.gender}</div>
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
