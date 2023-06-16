import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Row, message, theme } from 'antd';
import { UserLogin } from '../../../../types/user/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { UserController } from '../../../../controller/user/user.controller';
import { companyCPFCNPJ } from '../../../../util/platform.number/platform.number';
import { PlatformController } from '../../../../controller/platform/platform.controller';

export const LoginScreen = () => {
    const {
        token: { colorText, colorBgBase }
    } = theme.useToken();

    const [messageApi, contextHolder] = message.useMessage();

    const [isPlatform, setIsPlatform] = useState(true);

    useEffect(() => {
        const verifyPlatform = async () => {
            const request = await PlatformController.get();

            const data = request.data;

            if (data) {
                return;
            }
            setIsPlatform(false);
            return;
        };

        verifyPlatform();
    }, []);

    return (
        <Row
            className="p-5 h-100"
            style={{ width: 400, backgroundColor: colorBgBase }}
        >
            {contextHolder}
            <Col span={24}>
                {isPlatform && (
                    <Row
                        className="text-center"
                        justify={'center'}
                        gutter={[0, 20]}
                    >
                        <Col>
                            <h2>Login</h2>
                        </Col>
                        <Col span={24}>
                            <Form
                                name="normal_login"
                                className="login-form"
                                autoComplete="on"
                                initialValues={{ remember: true }}
                                onFinish={login}
                                size="large"
                            >
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    type: 'email',
                                                    message:
                                                        'O email é obrigatório!'
                                                }
                                            ]}
                                        >
                                            <Input
                                                prefix={
                                                    <UserOutlined className="site-form-item-icon" />
                                                }
                                                name="email"
                                                placeholder="email..."
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'A senha é obrigatória!'
                                                }
                                            ]}
                                        >
                                            <Input.Password
                                                prefix={
                                                    <LockOutlined className="site-form-item-icon" />
                                                }
                                                name="password"
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row justify={'center'} gutter={[30, 20]}>
                                    {/**
                 * <Row>
                <p>
                  Esqueceu a Senha? <a href="/"> Clique aqui.</a>
                </p>
              </Row>
                 */}
                                    <Col>
                                        <Button
                                            className="border-0"
                                            size="large"
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            <strong>Entrar</strong>
                                        </Button>
                                    </Col>

                                    <Col>
                                        <Button
                                            size="large"
                                            type="default"
                                            htmlType="reset"
                                        >
                                            <strong>Limpar</strong>
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                )}

                {!isPlatform && (
                    <Row className="text-center" justify={'center'}>
                        <Col span={24}>
                            <Button type="link" href="/platform-register">
                                <strong style={{ color: colorText }}>
                                    Clique aqui para cadastrar <br /> o primeiro
                                    usuário.
                                </strong>
                            </Button>
                        </Col>
                    </Row>
                )}
            </Col>
        </Row>
    );

    async function login(values: any) {
        const formValues: UserLogin = {
            email: values.email,
            password: values.password,
            companyCNPJ: companyCPFCNPJ
        };

        messageApi.open({
            key: 'login',
            type: 'loading',
            content: 'Carregando...'
        });

        const request = await UserController.login(formValues);

        const error = request.error;

        const message = request.message;

        if (!error) {
            setTimeout(() => {
                messageApi.open({
                    key: 'login',
                    type: 'success',
                    content: message,
                    duration: 2
                });
            }, 1000);

            setTimeout(() => {
                document.location = '/system';
            }, 2000);
        } else {
            setTimeout(() => {
                messageApi.open({
                    key: 'login',
                    type: 'error',
                    content: message
                });
            }, 1000);
        }
    }
};
