import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Schema = () => {
  const schema = yup.object().shape({
    name: yup.string().min(4).required("Must have 4 characters!"),
    age: yup
      .number()
      .integer()
      .positive()
      .required("Must be a number, positive and integer!"),
    email: yup.string().email().required("Must be a valid email!"),
    password: yup.string().min(6).required("Must have at leat 6 characters"),
    passwordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const sendForm = (event) => {
    console.log(event);
  };

  return (
    <div className="App">
        <form onSubmit={handleSubmit(sendForm)}>
          <label>Name:</label>{" "}
          <input placeholder="Name" name="name" ref={register}></input>
          <span style={{ color: "red" }}>{errors.name?.message}</span>
          <br />
          <label>Age:</label>
          <input placeholder="Age" name="age" ref={register}></input>
          <span style={{ color: "red" }}>{errors.age?.message}</span>
          <br />
          <label>E-mail:</label>
          <input placeholder="Email" name="email" ref={register}></input>
          <span style={{ color: "red" }}>{errors.email?.message}</span>
          <br />
          <label>Password</label>
          <input placeholder="Password" name="password" ref={register}></input>
          <span style={{ color: "red" }}>{errors.password?.message}</span>
          <br />
          <label>Confirm Password:</label>
          <input
            placeholder="ConfirmPassword"
            name="passwordConfirmed"
            ref={register}
          ></input>
          <span style={{ color: "red" }}>
            {errors.passwordConfirm?.message}
          </span>
          <br />
          <button type="submit">Send</button>
        </form>
    </div>
  );
}

export default Schema;
