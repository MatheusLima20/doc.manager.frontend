import React, { useState, useEffect } from 'react';
import './App.css';
import { AppNavigation } from './app/app.navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import { Col, ConfigProvider, Layout, Row, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Spinner } from 'react-bootstrap';
import { UserDataLogged } from './app/types/user/user';
import { cookies } from './app/controller/user/adm.cookies';

const initialValues: UserDataLogged = {
    name: '',
    platformName: '',
    token: '',
    userType: ''
};

function App() {
    const [login, setLogin] = useState<UserDataLogged>(initialValues);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = cookies.get('data.user');

        const loginData = userData.token ? userData : initialValues;

        setLogin(loginData);

        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#010064',
                    colorBgLayout: '#fff',
                    colorTextSecondary: '#fff'
                }
            }}
        >
            <Layout>
                {!loading && <AppNavigation dataUser={login} />}

                {loading && (
                    <Space direction="vertical">
                        <Content
                            style={{
                                lineHeight: '100vh'
                            }}
                            className="content-skeleton "
                        >
                            <Row
                                aria-orientation="horizontal"
                                justify={'center'}
                                align={'bottom'}
                                style={{ textAlign: 'center' }}
                            >
                                <Col>
                                    <Spinner
                                        animation="grow"
                                        variant="primary"
                                    />
                                </Col>
                            </Row>
                        </Content>
                    </Space>
                )}
            </Layout>
        </ConfigProvider>
    );
}

export default App;
