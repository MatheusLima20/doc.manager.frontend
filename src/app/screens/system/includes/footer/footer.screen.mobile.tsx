import React from 'react';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import Accordion from 'react-bootstrap/Accordion';
import { MenuNavigation } from '../../../../types/includes/include.types';
import { MenuList } from '../menu.list/menu.list';
import { Col, Row, theme } from 'antd';
import { Images } from '../../../../config/images';

interface Props {
    navigateMenu: MenuNavigation[];
}

const CustomToggle = React.forwardRef(function ref(
    { children }: any,
    ref: any
) {
    return (
        <div ref={ref}>
            <strong>{children}</strong>
        </div>
    );
});

export const FooterMobileScreen = (props: Props) => {
    const {
        token: { colorPrimary, colorTextSecondary }
    } = theme.useToken();
    return (
        <Row style={{ backgroundColor: colorPrimary }} justify={'center'}>
            <Col span={24} className="mt-5 text-center">
                <img src={Images.logo} width={150} />
            </Col>
            <Col span={24} className="mt-5 mb-5 ">
                <Accordion as={CustomToggle}>
                    {props.navigateMenu.map((values, index) => {
                        return (
                            <div key={index}>
                                <Accordion.Item
                                    eventKey={index.toString()}
                                    className="p-3"
                                >
                                    <Accordion.Header>
                                        <div
                                            style={{
                                                color: colorTextSecondary
                                            }}
                                            className="row justify-content-between w-100"
                                        >
                                            <div className="col-10">
                                                {values.title}
                                            </div>
                                            <div className="col-1">
                                                <IoMdArrowDropdownCircle />
                                            </div>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {values.subTitles.map(
                                            (value, index) => {
                                                return (
                                                    <MenuList
                                                        key={index}
                                                        href={value.href}
                                                        name={value.name}
                                                    />
                                                );
                                            }
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </div>
                        );
                    })}
                </Accordion>
            </Col>
        </Row>
    );
};
