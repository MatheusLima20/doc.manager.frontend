import React, { useRef, useState } from 'react';
import {
    Button,
    Col,
    Input,
    InputRef,
    message,
    Row,
    Space,
    Table,
    TableProps
} from 'antd';
import { Doc } from '../../../../types/content/content';
import { ContentController } from '../../../../controller/content/content.controller';
import 'suneditor/dist/css/suneditor.min.css';
import {
    ColumnType,
    ColumnsType,
    FilterConfirmProps,
    SorterResult
} from 'antd/es/table/interface';
import { AiOutlineSearch } from 'react-icons/ai';
import { SearchOutlined } from '@ant-design/icons';
import { HomeDoc } from './home.doc';
import { FaFileSignature } from 'react-icons/fa';

type DataIndex = keyof Doc;

interface Props {
    docs: Doc[];
    onClick: () => void;
}

export const HomeSignature = (props: Props) => {
    const docs = props.docs;

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
        },
        {
            key: 'signature',
            title: 'Assinar',
            width: 100,
            render: (data: Doc) => (
                <Button size="large" onClick={() => save(data.id)}>
                    <FaFileSignature size={30} />
                </Button>
            )
        }
    ];

    return (
        <Row justify={'center'} gutter={[0, 20]}>
            {contextHolder}

            <Col>
                <Button type="default" onClick={() => props.onClick()}>
                    <strong>Atualizar</strong>
                </Button>
            </Col>

            <Col span={24}>
                <Row gutter={[0, 30]} className="mb-5">
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

    async function save(id: number) {
        messageApi.open({
            key: 'content.signature',
            type: 'loading',
            content: 'Enviando...',
            duration: 7
        });

        const request = await ContentController.patchDoc(id);

        const error = request.error;

        const message = request.message;

        const type = error ? 'error' : 'success';

        setTimeout(() => {
            messageApi.open({
                key: 'content.signature',
                type: type,
                content: message,
                duration: 7
            });
            if (!error) {
                props.onClick();
            }
        }, 1000);
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
