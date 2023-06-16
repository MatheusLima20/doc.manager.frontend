import React from 'react';
import './home.css';
import { Content } from 'antd/es/layout/layout';
import { Login } from '../login';
import { Col, Row, Space } from 'antd';

export const HomeScreen = () => {
    return (
        <Space direction="vertical">
            <Content
                style={{
                    lineHeight: '50vh'
                }}
                className="content-skeleton"
            >
                <Row
                    aria-orientation="vertical"
                    justify={'center'}
                    align={'bottom'}
                    style={{ textAlign: 'center' }}
                >
                    <Col>
                        <Login />
                    </Col>
                </Row>
            </Content>
        </Space>
    );
};
