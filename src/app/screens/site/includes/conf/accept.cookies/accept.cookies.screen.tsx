import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { cookies } from '../../../../../controller/user/adm.cookies';
import { ToastAcceptCookies } from './toast.accept.cookies';

export const AcceptCookiesScreen = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => {
        const accepted = cookies.get('accept.cookies');
        const isAccepted = accepted === '';
        setShow(isAccepted);
    }, []);

    return (
        <Container fluid>
            <Row>
                <ToastAcceptCookies
                    show={show}
                    onHide={() => {
                        handleClose();
                        cookies.store({ accepted: true }, 'accept.cookies');
                    }}
                />
            </Row>
        </Container>
    );
};
