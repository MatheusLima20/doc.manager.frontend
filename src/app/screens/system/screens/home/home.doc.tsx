import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './home.css';
import { Button, Col, Row } from 'antd';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { FiPrinter } from 'react-icons/fi';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Props {
    url: string;
}

export const HomeDoc = (props: Props) => {
    const url = props.url;

    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    function changePage(offset: any) {
        setPageNumber((prevPageNumber) => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    function onDocumentLoadSuccess({ numPages }: any) {
        setNumPages(numPages);
    }

    return (
        <Row justify={'center'}>
            <Col>
                <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page scale={0.6} pageNumber={pageNumber} />
                </Document>
                <Row justify={'center'} gutter={[0, 10]}>
                    <Col md={24}>
                        <Row justify={'end'}>
                            <Col>
                                <Button size="large" href={url} target="_blank">
                                    <FiPrinter size={30} />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        Page {pageNumber || (numPages ? 1 : '--')} de{' '}
                        {numPages || '--'}
                    </Col>
                    <Col md={24}>
                        <Row justify={'center'} gutter={[10, 0]}>
                            <Col>
                                <Button
                                    size="large"
                                    disabled={pageNumber <= 1}
                                    onClick={previousPage}
                                >
                                    <IoIosArrowDropleft size={30} />
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    size="large"
                                    disabled={pageNumber >= numPages}
                                    onClick={nextPage}
                                >
                                    <IoIosArrowDropright size={30} />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
