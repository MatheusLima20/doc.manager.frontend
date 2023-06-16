import { Card, Col, Row, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { HomeContentForm } from './home.content.form';
import { SlBookOpen } from 'react-icons/sl';
import { FaImage } from 'react-icons/fa';
import { HomeDocForm } from './home.doc.form';
import { Doc } from '../../../../types/content/content';
import { ContentController } from '../../../../controller/content/content.controller';
import { Content } from 'antd/es/layout/layout';

export const HomeScreen = () => {
    const [docs, setDocs] = useState<Doc[]>([]);

    useEffect(() => {
        getDocs();
    }, []);

    const items = [
        {
            label: (
                <>
                    <SlBookOpen size={20} /> Conteúdo
                </>
            ),
            key: '1',
            children: (
                <HomeContentForm
                    gallery={docs}
                    onClick={() => {
                        getDocs();
                    }}
                />
            )
        },
        {
            label: (
                <>
                    <FaImage size={20} /> Imagens
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
        const request = await ContentController.getGallery();

        const data: Doc[] = request.data;

        if (data) {
            setDocs(data);
        }
    }
};
