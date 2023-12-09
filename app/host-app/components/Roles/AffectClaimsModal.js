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

export default function AffectClaimsModal({ isOpen, setOpen, role, onSubmit,claims }) {



  const INITIAL_FORM_STATE = {
    claims : []
    // ... add other fields as necessary
  };

  // role?.claims.map((obj) => ({
  //   text: obj.value,
  //   value: obj.value,
  // }))

  const FORM_VALIDATION = Yup.object().shape({

    // ... add other validations as necessary
  });

  const handleFormSubmit = (values) => {
    values  =  {...values,role}
    console.log("Values from Affect claims Modal are "+JSON.stringify(values))
    onSubmit(values);
    setOpen(false);
  };

  return (
    <MDBModal open={isOpen} setOpen={setOpen} tabIndex="-1">
      <MDBModalDialog size="lg">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Affect Claims</MDBModalTitle>
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