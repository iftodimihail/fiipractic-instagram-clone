import React from "react";
import Auth from "templates/Auth";
import styled from "styled-components";
import { history, useHistory } from "react-router-dom";
import { auth } from "utils/firebase";
import { Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const FormAuth = styled(Form)`
  button {
    width: 100%;
  }
`;

function Login() {
  const history = useHistory();

  const onFinish = (values) => {
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Auth>
      <FormAuth
        name="login_form"
        className="login-form"
        initialValues={{
          remember: true,
        }}
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/signup">register now!</a>
        </Form.Item>
      </FormAuth>
    </Auth>
  );
}

export default Login;
