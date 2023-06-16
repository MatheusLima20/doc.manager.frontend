import React, { useState } from 'react';
import { Accordion, Offcanvas } from 'react-bootstrap';
import { CgMenu } from 'react-icons/cg';
import { MenuNavigation } from '../../../../types/includes/include.types';
import { MenuList } from '../menu.list/menu.list';

interface Props {
    navigateMenu: MenuNavigation[];
}

export const MenuMobileScreen = (prop: Props) => {
    function OffCanvasExample({ ...props }: any) {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>
                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        handleShow();
                    }}
                    className="me-2"
                >
                    <CgMenu size={30} />
                </a>
                <Offcanvas show={show} onHide={handleClose} {...props}>
                    <Offcanvas.Header
                        className="primary-background-color"
                        closeButton
                    >
                        <Offcanvas.Title>
                            <div className="row">
                                <div className="col">
                                    <div className="row justify-content-start">
                                        <div className="col">Menu</div>
                                    </div>
                                </div>
                            </div>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="primary-background-color">
                        <Accordion>
                            {prop.navigateMenu.map((value, index) => {
                                return (
                                    <Accordion.Item
                                        key={index}
                                        eventKey={index.toString()}
                                    >
                                        <Accordion.Header className="menu-mobile">
                                            <strong>{value.title}</strong>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {value.subTitles.map(
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
                                );
                            })}
                        </Accordion>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        );
    }

    return <OffCanvasExample placement={'end'} name={'Button'} />;
};
