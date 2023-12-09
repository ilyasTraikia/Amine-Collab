import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalBody } from 'mdb-react-ui-kit';

export default function TestModal() {
  const [bottomModal, setBottomModal] = useState(false);

  const toggleOpen = () => setBottomModal(!bottomModal);

  return (
    <>
      <MDBBtn onClick={toggleOpen}>Launch frame modal</MDBBtn>

      <MDBModal animationDirection='right' open={bottomModal} tabIndex='-1' setOpen={setBottomModal} >
        <MDBModalDialog className='custom-modal-dialog' position='right' frame    >
          <MDBModalContent>
            <MDBModalBody className='py-1' style={{ height: '100vh', overflowY: 'auto'}}>
              <div className='d-flex justify-content-center align-items-center my-3'>
                <p className='mb-0'>We use cookies to improve your website experience</p>
                <MDBBtn color='success' size='sm' className='ms-2' onClick={toggleOpen}>
                  Ok, thanks
                </MDBBtn>
                <MDBBtn size='sm' className='ms-2'>
                  Learn more
                </MDBBtn>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}