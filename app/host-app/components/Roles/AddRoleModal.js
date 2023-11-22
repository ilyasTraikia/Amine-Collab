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

export default function AddRoleModal({ isOpen, setOpen, role, onSubmit }) {

  const INITIAL_FORM_STATE = {
    description: role?.description || "",
    id: role?.id || "",
    name: role?.name || "",
    normalizedName : role?.normalizedName || "",
    claims : []
    // ... add other fields as necessary
  };

  const FORM_VALIDATION = Yup.object().shape({
    // id: Yup.string().required("Id is required"),
    description: Yup.string().required("Description is required"),
    name: Yup.string().required("Name is required"),
    // normalizedName: Yup.string().required("Normalized Name is required")
    // ... add other validations as necessary
  });

  const handleFormSubmit = (values) => {
    onSubmit(values);
    setOpen(false);
  };

  return (
    <MDBModal open={isOpen} setOpen={setOpen} tabIndex="-1">
      <MDBModalDialog size="lg">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Add new Role</MDBModalTitle>
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
                 {/* <MDBInput
                    label="Role Id"
                    id="id"
                    name="id"
                    type="text"
                    onChange={handleChange}
                    value={values.id}
                    className="mb-3"
                  /> */}
                  <MDBInput
                    label="Role Name"
                    id="nameRole"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    value={values.name}
                    className="mb-3"
                  />
                  <MDBInput
                    label="Description"
                    id="descriptionRole"
                    name="description"
                    type="text"
                    onChange={handleChange}
                    value={values.description}
                    className="mb-3"
                  />
                      {/* <MDBInput
                    label="Normalized Name"
                    id="normalizedName"
                    name="normalizedName"
                    type='tel'
                    onChange={handleChange}
                    value={values.normalizedName}
                    className="mb-3"
                  /> */}
                
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