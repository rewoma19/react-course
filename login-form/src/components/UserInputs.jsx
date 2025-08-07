function UserInputs(props) {
  const { togglePassword, showPassword, passwordBtnText } = props;

  return (
    <div className="inputs-container">
      <input type="email" placeholder="Email" name="" id="" />
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          name=""
          id=""
        />
        <button className="password-toggle" onClick={togglePassword}>
          {passwordBtnText}
        </button>
      </div>
    </div>
  );
}

export default UserInputs;
