// import u


// export default function SubmitSection() {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const handleAuth = () => {
//     if (state.activeAuthOption === "email") {
//       const emailError = !state.inputValues.email
//         ? "Can't be empty"
//         : !emailRegex.test(state.inputValues.email)
//         ? "Invalid email format"
//         : "";
//       const passwordError = !state.inputValues.password ? "Can't be empty" : "";

//       dispatch({
//         type: "SET_ERRORS",
//         payload: { emailError, passwordError },
//       });
//       return;
//     }

//     if (state.activeAuthOption === "number") {
//       const numberError = !state.inputValues.number ? "Can't be empty" : "";
//       dispatch({ type: "SET_ERRORS", payload: { numberError } });
//     }
//   };
//   return (
//     <section className='submit-section'>
//       <button
//         onClick={handleAuth}
//         className={`submit-btn ${state.active === "register" && !state.isChecked && "opacity-60"}`}
//         disabled={state.active === "register" && !state.isChecked}
//       >
//         {state.active === "register"
//           ? "REGISTRATION"
//           : state.activeAuthOption === "number"
//           ? "SEND CODE"
//           : "LOG IN"}
//       </button>
//       <hr />
//       <p className='font-bold'>Or log in with other method</p>
//       <button className='google-btn'>
//         <img className='google-icon' src={icon} />
//       </button>
//     </section>
//   );
// }
