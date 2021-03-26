import React from "react";
import styled from "styled-components";
import { history, useHistory } from "react-router-dom";
import { auth } from "utils/firebase";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const FormAuth = styled(Form)`
  button {
    width: 100%;
  }
`;

function SignUp() {
  const history = useHistory();

  const onFinish = (values) => {
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(async (authUser) => {
        await authUser.user.updateProfile({
          displayName: values.username,
        });

        history.push("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <FormAuth
      name="register_form"
      className="register-form"
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
        Or <a href="/login">login now!</a>
      </Form.Item>
    </FormAuth>
  );
}

export default SignUp;
