import React from 'react';
import { PlatformRegistrationForm } from './platform.registration.form';
import { Card, Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';

export const PlatformRegistrationScreen = () => {
    return (
        <Content className="mt-5">
            <Card className="border-0 shadow-lg p-3 mb-5 rounded m-4">
                <Row className="mt-5 mb-5">
                    <Col>
                        <h2>
                            <strong>Cadastro Inícial</strong>
                        </h2>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <PlatformRegistrationForm />
                </Row>
            </Card>
        </Content>
    );
};
