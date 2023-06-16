import React from 'react';
import './footer.css';
import { MenuNavigation } from '../../../../types/includes/include.types';
import { Footer } from 'antd/es/layout/layout';
import { Col, Row, theme } from 'antd';
import { TbPoint } from 'react-icons/tb';
import { Images } from '../../../../config/images';

interface Props {
    navigateMenu: MenuNavigation[];
}

export const FooterScreen = (props: Props) => {
    const {
        token: { colorPrimary, colorTextSecondary }
    } = theme.useToken();

    return (
        <Footer style={{ backgroundColor: colorPrimary }} className="mt-5 pb-5">
            <Row justify={'start'}>
                <Col span={24}>
                    <Row justify={'space-between'} align={'middle'}>
                        {props.navigateMenu.map((values, index) => {
                            return (
                                <Col key={index} md={5} className=" mt-5">
                                    <Row>
                                        <h6>
                                            <strong
                                                style={{
                                                    color: colorTextSecondary
                                                }}
                                            >
                                                {values.title}
                                            </strong>
                                        </h6>
                                    </Row>
                                    {values.subTitles.map((value, index) => {
                                        return (
                                            <Row key={index}>
                                                <div>
                                                    <a href={value.href}>
                                                        <span
                                                            style={{
                                                                color: colorTextSecondary
                                                            }}
                                                        >
                                                            <TbPoint
                                                                size={15}
                                                            />
                                                            &nbsp;
                                                            {value.name}
                                                        </span>
                                                    </a>
                                                </div>
                                            </Row>
                                        );
                                    })}
                                </Col>
                            );
                        })}

                        <Col>
                            <img src={Images.logo} width={170} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Footer>
    );
};
