// import React, { useState } from 'react';

// const Header = () => {

//     const [isHeaderVisible, setHeaderVisible] = useState(false);

//     const toggleHeader = () => {
//       setHeaderVisible(!isHeaderVisible);
//     };


//   return (
//     <div className={`header ${isHeaderVisible ? 'visible' : ''}`}>
//       <div className="top">
//         <div id="logo">
//           <span className="image avatar48"><img src="images/me.png" alt="" /></span>
//           <h1 id="title">Ryan M Howard</h1>
//           <p>Fullstack Developer</p>
//         </div>
//         <nav id="nav">
//           <ul>
//             <li><a href="#contact" id="contact-link"><span className="icon solid fa-envelope">Contact</span></a></li>
//           </ul>
//           <ul>
//           </ul>
//         </nav>
//       </div>
//       <div className="bottom">
//         <ul className="icons">
//           <li><a href="https://github.com/ryan-howard-hc" className="icon brands fa-github" style={{ fontSize: '44px' }}><span className="label">Github</span></a></li>
//           <li><a href="https://www.linkedin.com/in/ryan-matthew-howard/" className="fab fa-linkedin-in" style={{ fontSize: '44px' }}><span className="label"></span></a></li>
//         </ul>
//       </div>
//       <button className="toggle-header-button" onClick={toggleHeader}>
//         Toggle Header
//       </button>
//     </div>
//   );
// };

// export default Header;