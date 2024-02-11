// import React from 'react';
// import { useDispatch } from "react-redux";
// import { signInUser } from "../../redux/actionCreators/authActionCreator"
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//     const [email, setEmail] = React.useState('');
//     const [password, setPassword] = React.useState('');
//     const [success,setSuccess] = React.useState(false);

//     const dispatch = useDispatch(); 
//     const navigate = useNavigate();
    
//     const handleSubmit = (e) =>{
//         e.preventDefault();
//         if(!email || !password){
//             alert("please fill in all fields");
//             return;
//         }

//         dispatch(signInUser(email,password,setSuccess));

//     }

//     React.useEffect(()=>{
//         if(success){
//             navigate('/dashboard')
//         }
//     },[success])

//     return(
//         <form autoComplete='off' onSubmit={handleSubmit}>
//             <div className="form-group my-2">
//                 <input type="email" name="email" className="form-control" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
//             </div>
//             <div className="form-group my-2">
//                 <input type="password" name="password" className="form-control" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
//             </div>

//             <button type="submit" className="btn btn-primary my-2 form-control">Login</button>
//         </form>
//     )    
// }

// export default LoginForm;


import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';
import './LoginStyle.css';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signInUser } from "../../redux/actionCreators/authActionCreator";
import { useNavigate } from 'react-router-dom';

document.body.style.backgroundColor = '#4682B4';

const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(signInUser(email, password, setSuccess));
  };

  React.useEffect(() => {
    if (success) {
      navigate('/dashboard');
    }
  }, [success, navigate]);

  return (
    <div style={{backgroundColor:'#4682B4'}}>

<MDBContainer className="my-5 justify-content-center align-items-center" style={{ width: '90%',height:'50vh' }}>
      <MDBCard style={{ width: '150%',height:'150%',marginLeft: '-25%' }}>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              alt="login form"
              className="rounded-start w-100"
              style={{ height: '74.8vh' }}
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column" style={{marginTop: '10%'}}>
              <div className="d-flex flex-row mt-2">
                {/* <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} /> */}
                <span className="h1 fw-bold mb-0">Digital Sphere</span>
              </div>

              <h6 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px',marginLeft:'1%' }}>
              To keep connected with us please login with your personal info
              </h6>

              <MDBInput
                wrapperClass="mb-4"
                placeholder="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <MDBBtn className="mb-4 px-5" color="dark" size="lg" type="submit" noRipple onClick={handleSubmit}>
                Sign In
              </MDBBtn>
              <a className="small text-muted" href="#!">
                Forgot password?
              </a>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                Don't have an account? <Link to="/register">Register</Link>
                {/* <a href="/register" style={{ color: '#393f81' }}>
                  Register here
                </a> */}
              </p>

              
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>

    </div>
  );
};

export default LoginForm;
