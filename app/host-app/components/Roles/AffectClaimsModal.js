import React, {useEffect, useState} from "react";
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

  // This function gets the corresponding value of a role claims using the original valued claims array
  // to set the default claims for the role
  const getValues = (textArray, valueArray) => {
    return textArray?.map(({ text }) => {
      const match = valueArray.find(obj => obj.text === text);
      return match ? match.value : undefined;
    });
  };
    

    const  claimedRoles = role?.claims.map((obj,index) => ({
      text: obj.value
    }))
  
    const ValuedClaims = claims.map((e,index)=> ({
      text: e,
      value: index + 1,
    }))
   
    // Use the function to get corresponding values
   const correspondingValues = getValues(claimedRoles, ValuedClaims);
  
  const INITIAL_FORM_STATE = {
    claims : []
    // ... add other fields as necessary
  };


  const [selectedValues , setSelectedValues] = useState([correspondingValues])


  useEffect(() => {
    setSelectedValues(correspondingValues)
  }, [role,claims])


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
        
                return (
       
                <Form>
                  
                 <MDBSelect
                    id="claims"
                    name="claims"
                    multiple
                    data={   claims.map((str,index) => ({
                      text: str,
                      value: index + 1
                    }))}
                    value={selectedValues}
                    onValueChange={(e) => {
                      console.log(e)
                      const selectedClaims = e.map(option => option.value);
                      setSelectedValues(selectedClaims)
                      setFieldValue("claims", e.map(option => option.text));
             
                    }}
                    clearBtn
                    validation
                    validFeedback="This value is valid"
                    invalidFeedback="This value is invalid"
                  />                
                
                  {/* Add other fields as necessary */}
                  <MDBModalFooter>
                    <MDBBtn outline color='danger' type="button" onClick={() => setOpen(false)} >
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