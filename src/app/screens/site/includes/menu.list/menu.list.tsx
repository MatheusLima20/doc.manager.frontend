import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './menu.list.css';

interface Props {
    href: string;
    name: string;
}

export const MenuList = (props: Props) => {
    return (
        <ListGroup className="rounded-0" variant="light">
            <ListGroup.Item
                action
                variant="light"
                href={props.href}
                className="border-0"
            >
                {props.name}
            </ListGroup.Item>
        </ListGroup>
    );
};
