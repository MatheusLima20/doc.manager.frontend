import { Col, Dropdown, MenuProps, Row, theme } from 'antd';
import React from 'react';
import { MenuNavigation } from '../../../../types/includes/include.types';
import { TbUserCircle } from 'react-icons/tb';
import { Login } from '../../screens/login';
import { Logged } from '../../../logged.menu';
import { cookies } from '../../../../controller/user/adm.cookies';
import { BiLogIn } from 'react-icons/bi';

interface Props {
    navigateMenu: MenuNavigation[];
}

export const MenuScreen = (props: Props) => {
    const {
        token: { colorTextSecondary }
    } = theme.useToken();

    return (
        <Row justify={'center'}>
            <Col md={14}>
                <Menu />
            </Col>
        </Row>
    );

    function Menu() {
        const token = cookies.get('data.user').token;

        return (
            <Row className="m-2">
                <Col md={24}>
                    <Row justify={'end'} align={'stretch'}>
                        <Col>
                            <Row gutter={[20, 0]}>
                                {props.navigateMenu.map((value, index: any) => {
                                    const items: MenuProps['items'] = [];
                                    value.subTitles.map((sub) => {
                                        items.push({
                                            label: (
                                                <a
                                                    className="fs-6"
                                                    href={sub.href}
                                                >
                                                    {sub.name}
                                                </a>
                                            ),
                                            key: sub.name
                                        }) as any;
                                    });
                                    return (
                                        <Col className="mt-2" key={index}>
                                            <Dropdown menu={{ items }}>
                                                <a
                                                    style={{
                                                        color: colorTextSecondary
                                                    }}
                                                    className="fs-6"
                                                >
                                                    {value.title}
                                                </a>
                                            </Dropdown>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Col>
                        <Col>
                            <Dropdown
                                className="ms-4"
                                trigger={['click']}
                                dropdownRender={() =>
                                    !token ? <Login /> : <Logged />
                                }
                            >
                                <a style={{ color: colorTextSecondary }}>
                                    {token ? (
                                        <TbUserCircle size={40} />
                                    ) : (
                                        <BiLogIn size={40} />
                                    )}
                                </a>
                            </Dropdown>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
};
