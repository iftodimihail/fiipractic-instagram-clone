import React from 'react'
import styled from 'styled-components'
import { Form, Input, Button } from 'antd'
import Auth from 'templates/Auth'
import { history, useHistory } from "react-router-dom"
import { atuh } from "utils/firebase"


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

function Login () {

    const history = useHistory();

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <Auth>
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
        </Auth>
    )
}

export default Login;