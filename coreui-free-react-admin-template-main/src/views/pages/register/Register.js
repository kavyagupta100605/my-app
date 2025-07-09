import {useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {  cilUser } from '@coreui/icons'

const Register = () => {
 const[username,SetUsername] = useState();
 const[email,SetEmail] = useState();
 const navigate = useNavigate();
 const handleSubmit = async (e) => {
      e.preventDefault();
      const res=await axios.post("http://localhost:5000/register",
        {username,email}
      );
      navigate("/login"); 
 }


  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit = {handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                    placeholder="Username" 
                    autoComplete="username"
                    onChange = {(e)=>SetUsername(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput 
                    placeholder="Email" 
                    autoComplete="email" 
                    onChange={(e)=>SetEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    {/* <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>/ */}
                    {/* <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    /> */}
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    {/* <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText> */}
                    {/* <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    /> */}
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
