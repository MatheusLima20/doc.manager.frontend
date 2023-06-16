import { Button } from 'antd';
import React from 'react';
import { Col, Row, Toast, ToastContainer } from 'react-bootstrap';
import './accept.cookies.css';

interface Props {
    show: boolean;
    onHide: () => void;
}

export const ToastAcceptCookies = (props: Props) => {
    return (
        <ToastContainer
            className="row m-0 p-3 position-fixed"
            position="bottom-center"
        >
            <Toast
                className="col m-0 p-0"
                style={{ width: '90%' }}
                show={props.show}
                delay={5000}
            >
                <Toast.Header className="m-0 w-100" closeButton={false}>
                    <h5 className="text-dark m-1">
                        <strong>Consentimento de Cookies</strong>
                    </h5>
                </Toast.Header>
                <Toast.Body style={{ backgroundColor: '#fff' }}>
                    <Row>
                        <Col md={10}>
                            <p style={{ color: '#000', fontSize: 18 }}>
                                Nós utilizamos os cookies para personalizar
                                anúncios, gerar estatísticas e melhorar a sua
                                experiência no site. Ao continuar navegando,
                                você concorda com a nossa &nbsp;
                                <a
                                    className="privacy-policy"
                                    href="/privacy-policy"
                                >
                                    <strong>Política de Privacidade</strong>
                                </a>
                                .
                            </p>
                        </Col>
                        <Col md={1}>
                            <Row className="justify-content-center">
                                <Col className="col-4 button-hover">
                                    <Button
                                        size="large"
                                        className="button border"
                                        onClick={() => props.onHide()}
                                    >
                                        <strong>Entendi</strong>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};
