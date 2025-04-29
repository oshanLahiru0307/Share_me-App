import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Input, Typography, message, Row, Col } from "antd";
import UserController from "../ServiceController/UserServices";
import state from "../State/UserState";
import backImage1 from "../assets/backimage1.jpg"
import backImage2 from "../assets/backImage2.jpg"
import googleLogo from "../assets/glogo.png"

const { Title, Text } = Typography;

const UserLogin = () => {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log("Form values:", values);
      const response = await UserController.loginUser(values);
      console.log("Login response:", response); // Debugging line
      if (response) {
        state.userId = response.id;
        localStorage.setItem("user", JSON.stringify(state.userId));
        message.success("Login successful!");
        navigate("/"); 
      } else {
        message.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleGooglelogin = async () => {

  }

  return (
<div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: '100%',
                height: "100vh",
                background: `url(${backImage1})`,
                backgroundSize: "cover",
                backgroundPosition: 'center'
            }}
        >
            <div
                style={{
                    width: '1000px',
                    padding: "0",
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: "white",
                }}
            >
                <Row>
                    {/* Left Side - Image */}
                    <Col span={12} style={{ background: "#1890ff", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <img
                            src={backImage2}
                            alt="Login"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <div style={{ color: "white", textAlign: "center", position: "absolute", padding: "20px", bottom: "40%" }}>
                            <Title level={1} style={{ color: "white", textAlign: "center", marginBottom:'30px' }}>
                                Welcome to Share me
                            </Title>
                            <Title level={5} style={{ color: "white", textAlign: "center" }}>
                                Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.
                            </Title>
                        </div>
                    </Col>

                    {/* Right Side - Form */}
                    <Col span={12} style={{ padding: "40px" }}>
                        <Title level={3} style={{ color: "#1890ff", textAlign: "center" }}>
                            Sign in Account
                        </Title>
                        <Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: 20 }}>
                            Enter your credentials to access your account.
                        </Text>
                        <Form
                            form={form}
                            layout="vertical"
                            style={{ width: "100%" }}
                            onFinish={handleSubmit}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: "Please enter your email!" }]}
                            >
                                <Input placeholder="Enter your email" style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: "Please enter your password!" }]}
                            >
                                <Input.Password placeholder="Enter your password" />
                            </Form.Item>

                            <Button type="primary" htmlType="submit" loading={loading} block>
                                Sign in
                            </Button>
                            
                            <Button type="default" onClick={handleGooglelogin}block style={{ marginTop: '10px' }}>
                                <img src={googleLogo} alt="google logo" style={{width:'20px', height:'20px'}}/>Sign in with Google
                            </Button>

                            <Text type="secondary" style={{ display: "block", textAlign: "center", marginTop: '10px'  }}>
                                Not a member? <a href="/register">Sign up</a>
                            </Text>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
  );
};

export default UserLogin;
