import { Card, Col, Row, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { HomeSignature } from './home.signature';
import { FaFileSignature } from 'react-icons/fa';
import { HomeDocForm } from './home.doc.form';
import { Doc } from '../../../../types/content/content';
import { ContentController } from '../../../../controller/content/content.controller';
import { Content } from 'antd/es/layout/layout';
import { HiDocumentText } from 'react-icons/hi2';

export const HomeScreen = () => {
    const [docs, setDocs] = useState<Doc[]>([]);

    useEffect(() => {
        getDocs();
    }, []);

    const items = [
        {
            label: (
                <>
                    <FaFileSignature size={20} /> Assinatura
                </>
            ),
            key: '1',
            children: (
                <HomeSignature
                    docs={docs}
                    onClick={() => {
                        getDocs();
                    }}
                />
            )
        },
        {
            label: (
                <>
                    <HiDocumentText size={20} /> Documentos
                </>
            ),
            key: '2',
            children: (
                <HomeDocForm
                    docs={docs}
                    onClick={() => {
                        getDocs();
                    }}
                />
            )
        }
    ];

    return (
        <Content>
            <Row>
                <Col span={24} className="mt-5">
                    <Card
                        bordered={false}
                        className="shadow-lg mb-5 bg-body-tertiary rounded m-4"
                    >
                        <Row
                            justify={'center'}
                            className="text-center mt-5 mb-5"
                        >
                            <Col span={24}>
                                <h3>
                                    <strong>Documentos</strong>
                                </h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Tabs defaultActiveKey="2" items={items} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Content>
    );

    async function getDocs() {
        setDocs([]);
        const request = await ContentController.getDocs();

        const data: Doc[] = request.data;

        if (data) {
            setDocs(data);
        }
    }
};
