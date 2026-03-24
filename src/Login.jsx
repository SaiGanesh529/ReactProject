// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import bookHubLogo from './assets/book_hub_logo.svg';
// import './Login.css';
// import login from './assets/login.jpg'
// function Login() {
//   const [errorMsg, setErrorMsg] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [userDetails, setUserDetails] = useState({
//     username: '',
//     password: '',
//   });

//   const navigate = useNavigate();
//   const postData = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setErrorMsg('');

//   try {
//     const username = userDetails.username
//     const password = userDetails.password
//     const res = await fetch('/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username,
//         password
//       }),
//     });

//     console.log("status:", res.status);
//     console.log("headers:", res.headers.get("content-type"));

//       const text = await res.text();
//       console.log("raw response:", text);

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.error_msg);
//     }

//     localStorage.setItem('jwt_token', data.jwt_token);
//     navigate('/home');
//   } catch (error) {
//     setErrorMsg(error.message);
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="login-container">
//       {/* Left Side - Image */}
//       <div className="login-image-section">
//         <img
//           src={login}
//           alt="Book and Coffee"
//           className="login-side-image"
//         />
//       </div>

//       {/* Right Side - Form */}
//       <div className="login-form-section">
//         <div className="login-form-container">
//           <div className="logo-container">
//             <img src={bookHubLogo} alt="Book Hub Logo" className="app-logo" />
//             {/* Text is inside the SVG, but we can add it here if needed. SVG has text. */}
//           </div>

//           <form className="login-form" onSubmit={postData}>
//             <div className="input-group">
//               <label htmlFor="username">Username*</label>
//               <input
//                 type="text"
//                 id="username"
//                 value={userDetails.username}
//                 placeholder=""
//                 onChange={(e) =>
//                   setUserDetails({ ...userDetails, username: e.target.value })
//                 }
//               />
//             </div>

//             <div className="input-group">
//               <label htmlFor="password">Password*</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={userDetails.password}
//                 placeholder=""
//                 onChange={(e) =>
//                   setUserDetails({ ...userDetails, password: e.target.value })
//                 }
//               />
//             </div>

//             {errorMsg && <p className="error-text">{errorMsg}</p>}

//             <button
//               type="submit"
//               className="login-button"
//               disabled={loading || !userDetails.username || !userDetails.password}
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bookHubLogo from './assets/book_hub_logo.svg';
import './Login.css';
import login from './assets/login.jpg';

function Login() {
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const postData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { username, password } = userDetails;

      const res = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error_msg || 'Login failed');
      }

      localStorage.setItem('jwt_token', data.jwt_token);
      navigate('/home');
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Image */}
      <div className="login-image-section">
        <img src={login} alt="Login" className="login-side-image" />
      </div>

      {/* Right Form */}
      <div className="login-form-section">
        <div className="login-form-container">
          <div className="logo-container">
            <img src={bookHubLogo} alt="Book Hub Logo" className="app-logo" />
          </div>

          <form className="login-form" onSubmit={postData}>
            <div className="input-group">
              <label htmlFor="username">Username*</label>
              <input
                type="text"
                id="username"
                value={userDetails.username}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, username: e.target.value })
                }
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
              />
            </div>

            {errorMsg && <p className="error-text">{errorMsg}</p>}

            <button
              type="submit"
              className="login-button"
              disabled={
                loading ||
                !userDetails.username ||
                !userDetails.password
              }
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

