import { Col, Row, theme } from 'antd';
import React from 'react';
import { Images } from '../../../../config/images';
import { Menu } from '../menu';
import './header.css';

export const HeaderScreen = () => {
    const {
        token: { colorPrimary, colorTextSecondary }
    } = theme.useToken();

    return (
        <Row
            className="p-0 pb-4"
            justify={'space-between'}
            align={'top'}
            style={{ backgroundColor: colorPrimary }}
        >
            <Col push={1} md={9}>
                <Row>
                    <a href="/">
                        <Row align={'middle'}>
                            <Col>
                                <img
                                    className="img-logo"
                                    src={Images.logo}
                                    alt="Sua logo aqui."
                                />
                            </Col>
                            <Col className="ms-2">
                                <p style={{ color: colorTextSecondary }}>
                                    <strong>Missão Católica</strong>
                                </p>
                            </Col>
                        </Row>
                    </a>
                </Row>
            </Col>
            <Col md={15}>
                <Menu />
            </Col>
        </Row>
    );
};
