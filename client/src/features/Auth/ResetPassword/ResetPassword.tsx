import "./ResetPassword.scss";
import FloatingInput from "../../../components/reusable/FloatingInput";

export default function ResetPassword() {
  return (
    <div className='reset-password-container'>
      <h2>Password Recovery</h2>
      <hr />
      <h3>Enter your phone number or email</h3>
      {/* <FloatingInput  /> */}
      <button>RECOVER PASSWORD</button>
    </div>
  );
}
