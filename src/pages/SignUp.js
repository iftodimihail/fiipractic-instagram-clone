import React from 'react'
import styled from 'styled-components'
import { Form, Input, Button } from 'antd'
import { history, useHistory } from "react-router-dom"
import { auth } from "utils/firebase"


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

function SignUp () {

    const history = useHistory();

    const onFinish = (values) => {
        auth
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(async (authUser) => {
                await authUser.user.updateProfile({
                    displayName: values.username
                })

                history.push("/")
            })
            .catch((err) => console.log(err.message))
    };

    return (
        <Form {...layout} name="basic" onFinish={onFinish}>
            <Form.Item
                label="Username"
                name="username"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                {
                    required: true,
                    message: 'Please input your email!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SignUp;