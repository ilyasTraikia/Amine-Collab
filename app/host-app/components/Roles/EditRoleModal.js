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
  MDBSelect,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdb-react-ui-kit";

export default function EditRoleModal({ isOpen, setOpen, role, onSubmit,claims }) {



  const INITIAL_FORM_STATE = {
    description: role?.role.description || "",
    id: role?.role.id || "",
    name: role?.role.name || "",
    normalizedName : role?.role.normalizedName || "",
    claims : []
    // ... add other fields as necessary
  };

  // role?.claims.map((obj) => ({
  //   text: obj.value,
  //   value: obj.value,
  // }))

  const FORM_VALIDATION = Yup.object().shape({
    description: Yup.string().required("Description is required"),
    name: Yup.string().required("Name is required"),
    normalizedName: Yup.string().required("Normalized Name is required"),
    // ... add other validations as necessary
  });

  const handleFormSubmit = (values) => {
    console.log("Values from handle Role Modal are "+JSON.stringify(values)
    )
    onSubmit(values);
    setOpen(false);
  };

  return (
    <MDBModal open={isOpen} setOpen={setOpen} tabIndex="-1">
      <MDBModalDialog size="lg">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Edit Role</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={() => setOpen(false)}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <Formik
              initialValues={INITIAL_FORM_STATE}
              validationSchema={FORM_VALIDATION}
              onSubmit={handleFormSubmit}
              enableReinitialize
            >
              {({ handleChange, setFieldValue, values }) => { 
                console.log(values)
                return (
       
                <Form>
                  <MDBInput
                    label="Role Name"
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    value={values.name}
                    className="mb-3"
                  />
                  <MDBInput
                    label="Description"
                    id="description"
                    name="description"
                    type="text"
                    onChange={handleChange}
                    value={values.description}
                    className="mb-3"
                  />
                      <MDBInput
                    label="Normalized Name"
                    id="normalizedName"
                    name="normalizedName"
                    type='tel'
                    onChange={handleChange}
                    value={values.normalizedName}
                    className="mb-3"
                  />


                 <MDBSelect
                    id="claims"
                    name="claims"
                    multiple
                    data={   claims.map((str) => ({
                      text: str,
                      value: str
                    }))}
                    selected={values.claims}
                    onChange={(e) => {
                      const selectedClaims = e.map(option => option.value);
                      setFieldValue("claims", selectedClaims);
                    }}
                    clearBtn
                    validation
                    validFeedback="This value is valid"
                    invalidFeedback="This value is invalid"
                  />                
                
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
              )}}
            </Formik>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}