import React, { useEffect, useState } from 'react';
import { MenuMobileScreen } from './menu.mobile.screen';
import { MenuScreen } from './menu.screen';
import './menu.css';
import { MenuNavigation } from '../../../../types/includes/include.types';
import { Col, Row } from 'antd';

const navigateMenu: MenuNavigation[] = [
    {
        title: 'Missão',
        subTitles: [{ name: 'Retiros', href: '/retreats' }]
    },
    {
        title: 'Artigos',
        subTitles: [{ name: 'Doutrinário', href: '/articles' }]
    },
    {
        title: 'Sobre',
        subTitles: [
            { name: 'Politica de privacidade', href: '/about' },
            { name: 'Nossa história', href: '/about' }
        ]
    }
];

export const Menu = () => {
    const [screenMobile, setScreenMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            const sizeMobile: boolean = window.innerWidth < 930;
            setScreenMobile(sizeMobile);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {!screenMobile && (
                <Row align={'middle'}>
                    <Col md={24}>
                        <MenuScreen navigateMenu={navigateMenu} />
                    </Col>
                </Row>
            )}

            {screenMobile && (
                <Row justify={'end'}>
                    <Col pull={3} md={2} className="mt-3">
                        <MenuMobileScreen navigateMenu={navigateMenu} />
                    </Col>
                </Row>
            )}
        </>
    );
};
