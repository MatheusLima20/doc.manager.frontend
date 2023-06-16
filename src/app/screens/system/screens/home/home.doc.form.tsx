import React, { useState, useRef } from 'react';
import {
    Button,
    Col,
    Form,
    Input,
    InputRef,
    message,
    Row,
    Space,
    Table,
    UploadFile,
    UploadProps
} from 'antd';
import { Content, Doc } from '../../../../types/content/content';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined, SearchOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { ContentController } from '../../../../controller/content/content.controller';
import { ColumnsType, ColumnType, TableProps } from 'antd/es/table';
import { FilterConfirmProps, SorterResult } from 'antd/es/table/interface';
import { AiOutlineSearch } from 'react-icons/ai';
import { HomeDoc } from './home.doc';

type DataIndex = keyof Doc;

type InitialValues = {
    title?: string;
    fileName?: string;
    contentType: string;
    id?: number;
};

const initialValues: InitialValues = {
    id: 0,
    title: undefined,
    fileName: undefined,
    contentType: ''
};

interface Props {
    docs: Doc[];
    onClick: () => void;
}

export const HomeDocForm = (props: Props) => {
    const docs = props.docs;

    const [file, setFile] = useState<RcFile>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [values, setValues] = useState(initialValues);
    const [messageApi, contextHolder] = message.useMessage();
    const [sortedInfo, setSortedInfo] = useState<SorterResult<Doc>>({
        order: 'ascend',
        columnKey: 'finalClientName'
    });

    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        dataIndex: DataIndex
    ) => {
        confirm();
    };

    const handleResetSearch = (clearFilters: () => void) => {
        clearFilters();
    };

    const handleReset = () => {
        const element = document.getElementById('form_doc') as any;
        setValues({ ...initialValues });
        element.reset();
    };

    const handleChangeTable: TableProps<Doc>['onChange'] = (
        pagination,
        filters,
        sorter
    ) => {
        setSortedInfo(sorter as SorterResult<Doc>);
    };

    const getColumnSearchProps = (
        dataIndex: DataIndex,
        title: string
    ): ColumnType<Doc> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close
        }) => (
            <div style={{ padding: 10 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Pesquisar ${title}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(
                            selectedKeys as string[],
                            confirm,
                            dataIndex
                        )
                    }
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex
                            );
                            close();
                        }}
                        icon={<AiOutlineSearch size={20} />}
                        size="middle"
                        style={{ width: 90 }}
                    >
                        Pesquisar
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleResetSearch(clearFilters)
                        }
                        size="small"
                        style={{ width: 90 }}
                    >
                        Limpar
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value, record: any) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        }
    });

    const columns: ColumnsType<Doc> = [
        {
            key: 'tag',
            title: 'Tipo',
            dataIndex: 'tag',
            width: 250,
            sortOrder: sortedInfo.columnKey === 'tag' ? sortedInfo.order : null,
            sorter: (a, b) => a.tag.localeCompare(b.tag),
            ...getColumnSearchProps('tag', 'Tipo')
        },
        {
            key: 'alt',
            title: 'Titulo',
            dataIndex: 'alt',
            width: 250,
            sortOrder: sortedInfo.columnKey === 'alt' ? sortedInfo.order : null,
            sorter: (a, b) => a.alt.localeCompare(b.alt),
            ...getColumnSearchProps('alt', 'Titulo')
        }
    ];

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setValues({ ...values, [name]: value });
    };

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        const file = newFileList[0];

        if (file) {
            const isPDF = file.type === 'application/pdf';
            if (!isPDF) {
                message.error('Só é permitido imagens nos formatos PDF!');
                return;
            }
            const fileSize: any = file.size;
            const isLt2M = fileSize / 1024 / 1024 < 5;
            if (!isLt2M) {
                message.error('o arquivo tem mais de 5MB!');
                return;
            }
        }
        setFileList(newFileList);
    };

    const uploadProps: UploadProps = {
        maxCount: 1,
        fileList: fileList,
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFile(file);
            return false;
        }
    };

    return (
        <Row>
            {contextHolder}
            <Col span={24} className="mb-5">
                <Form
                    id="form_doc"
                    layout="vertical"
                    size="large"
                    requiredMark={false}
                    autoComplete="on"
                    initialValues={initialValues}
                    fields={[
                        { name: 'title', value: values.title },
                        { name: 'contentType', value: values.contentType }
                    ]}
                    onFinish={save}
                >
                    <Row justify={'center'} gutter={[20, 0]}>
                        <Col md={12}>
                            <Form.Item
                                label="Titulo"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Digite o título.',
                                        max: 20,
                                        min: 3
                                    }
                                ]}
                            >
                                <Input
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    placeholder="Digite seu titulo..."
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                label="Tipo"
                                name="contentType"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Digite o tipo.',
                                        max: 20,
                                        min: 3
                                    }
                                ]}
                            >
                                <Input
                                    name="contentType"
                                    value={values.contentType}
                                    onChange={handleChange}
                                    placeholder="Digite seu tipo..."
                                />
                            </Form.Item>
                        </Col>

                        <Col md={24}>
                            <Form.Item label="Imagem" name="file">
                                <Dragger
                                    {...uploadProps}
                                    name="file"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Clique ou arraste a imagem para a área
                                        de upload.
                                    </p>
                                    <p className="ant-upload-hint">
                                        Envie arquivos imagens com menos de 5Mb,
                                        e resolução de 1366 X 768
                                    </p>
                                </Dragger>
                            </Form.Item>
                        </Col>

                        <Col span={24} className="mt-5">
                            <Row justify={'center'} className="text-center">
                                <Col md={4}>
                                    <Button type="primary" htmlType="submit">
                                        <strong className="text-white">
                                            Enviar
                                        </strong>
                                    </Button>
                                </Col>

                                <Col md={4}>
                                    <Button
                                        type="default"
                                        onClick={handleReset}
                                    >
                                        <strong>Limpar</strong>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Col>

            <Col span={24}>
                <Row gutter={[0, 30]} className="mb-5">
                    <Col md={24}>
                        <p>Galeria de Imagens</p>
                    </Col>
                    <Col md={24}>
                        <Table
                            columns={columns}
                            dataSource={initTable()}
                            onChange={handleChangeTable}
                            expandable={{
                                expandedRowRender: (data) => {
                                    return (
                                        <Row
                                            justify={'center'}
                                            gutter={[0, 40]}
                                        >
                                            <Col md={20}>
                                                <HomeDoc url={data.src} />
                                            </Col>
                                        </Row>
                                    );
                                }
                            }}
                            pagination={{
                                defaultPageSize: 5,
                                pageSizeOptions: [5, 10, 20],
                                showTotal: () => (
                                    <Row>
                                        <Col>
                                            <strong>Pedidos:</strong>{' '}
                                            {docs.length}
                                        </Col>
                                    </Row>
                                )
                            }}
                            scroll={{ y: 740 }}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );

    async function save() {
        if (values.contentType !== 'text' && !fileList.length) {
            messageApi.open({
                key: 'platform.registration',
                type: 'error',
                content: 'Um arquivo precisa ser inserido!',
                duration: 7
            });
            return;
        }
        messageApi.open({
            key: 'content.registration',
            type: 'loading',
            content: 'Enviando...',
            duration: 7
        });

        const dataValues: Content = {
            title: values.title,
            contentType: values.contentType
        };

        const request = await ContentController.store(dataValues, file);

        const error = request.error;

        const message = request.message;

        const type = error ? 'error' : 'success';

        setTimeout(() => {
            messageApi.open({
                key: 'content.registration',
                type: type,
                content: message,
                duration: 7
            });
            if (!error) {
                handleReset();
                setFileList([]);
            }
        }, 1000);
    }

    async function deleteImage(id: number) {
        messageApi.open({
            key: 'platform.registration',
            type: 'loading',
            content: 'Carregando...',
            duration: 3
        });
        const request = await ContentController.deleteImage(id);

        const message = request.message;
        const error = request.error;
        messageApi.open({
            key: 'platform.registration',
            type: error ? 'error' : 'success',
            content: message,
            duration: 7
        });
    }

    function initTable() {
        const values = docs;
        const data: any[] = [];

        values.map((value, index) => {
            return data.push({
                ...value,
                key: index
            });
        });

        return data;
    }
};
