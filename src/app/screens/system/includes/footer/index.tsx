import React, { useEffect, useState } from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { MenuNavigation } from '../../../../types/includes/include.types';
import { FooterScreen } from './footer.screen';
import { FooterMobileScreen } from './footer.screen.mobile';
import './footer.css';

const menuFooter: MenuNavigation[] = [];

export const Footer = () => {
    const [dimensions, setDimensions] = useState<any>({
        height: typeof window !== 'undefined' && window.innerHeight,
        width: typeof window !== 'undefined' && window.innerWidth
    });
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        };
        window.addEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <AnimationOnScroll
                initiallyVisible={false}
                animateIn="animate__fadeIn"
                animateOut="animate__fadeOut"
            >
                {dimensions.width > 1005 && (
                    <FooterScreen navigateMenu={menuFooter} />
                )}
                {dimensions.width < 1005 && (
                    <FooterMobileScreen navigateMenu={menuFooter} />
                )}
            </AnimationOnScroll>
        </>
    );
};
