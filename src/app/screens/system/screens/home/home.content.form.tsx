import React, { useRef, useState } from 'react';
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Image,
    Input,
    message,
    Modal,
    Radio,
    Row,
    Select
} from 'antd';
import { Content, Doc } from '../../../../types/content/content';
import { ContentController } from '../../../../controller/content/content.controller';
import SunEditor from 'suneditor-react';
import SunEditorCore from 'suneditor/src/lib/core';
import 'suneditor/dist/css/suneditor.min.css';
import plugins from 'suneditor/src/plugins';
import { cookies } from '../../../../controller/user/adm.cookies';
import { FaImages } from 'react-icons/fa';
import Meta from 'antd/es/card/Meta';

type InitialValues = {
    title?: string;
    subTitle?: string;
    video?: string;
    path?: string;
    url?: string;
    page: string;
    contentType: string;
    id?: number;
};

const initialValues: InitialValues = {
    id: 0,
    title: undefined,
    subTitle: undefined,
    path: undefined,
    page: 'home',
    contentType: 'text',
    url: undefined
};

const cookie = cookies.get('data.user');

const token = cookie.token;

interface Props {
    gallery: Doc[];
    onClick: () => void;
}

export const HomeContentForm = (props: Props) => {
    const gallery = props.gallery;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [text, setText] = useState<string>();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const editor = useRef<SunEditorCore>();

    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
        setTimeout(() => {
            editor.current?.setOptions({
                charCounter: true,
                charCounterType: 'byte',
                maxCharCount: 5000
            });
        }, 500);
    };

    const [values, setValues] = useState(initialValues);
    const [messageApi, contextHolder] = message.useMessage();

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setValues({ ...values, [name]: value });
    };

    const handleReset = () => {
        const element = document.getElementById('form') as any;
        setValues({
            ...initialValues,
            page: values.page,
            contentType: values.contentType
        });
        element.reset();
    };

    return (
        <Row gutter={[0, 20]}>
            {contextHolder}
            <Col span={24} className="mb-5">
                <Form
                    id="form"
                    layout="vertical"
                    size="large"
                    requiredMark={false}
                    scrollToFirstError={true}
                    initialValues={initialValues}
                    fields={[
                        { name: 'title', value: values.title },
                        { name: 'subTitle', value: values.subTitle },
                        { name: 'contentType', value: values.contentType },
                        { name: 'page', value: values.page },
                        { name: 'url', value: values.url },
                        { name: 'text', value: text }
                    ]}
                    onFinish={save}
                >
                    <Row justify={'center'} gutter={[20, 0]}>
                        <Col md={4}>
                            <Form.Item label="Página" name={'page'}>
                                <Select
                                    defaultValue={values.page}
                                    value={values.page}
                                    onChange={(value) => {
                                        const event = {
                                            target: {
                                                value: value,
                                                name: 'page'
                                            }
                                        };

                                        handleChange(event);
                                    }}
                                    options={[
                                        { value: 'home', label: 'Home' },
                                        { value: 'article', label: 'Artigo' },
                                        { value: 'about', label: 'Sobre' }
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={4}>
                            <Form.Item
                                label="Tipo de Conteúdo"
                                name="contentType"
                            >
                                <Select
                                    defaultValue={values.contentType}
                                    value={values.contentType}
                                    onChange={(value) => {
                                        const event = {
                                            target: {
                                                value: value,
                                                name: 'contentType'
                                            }
                                        };

                                        if (value === 'slider') {
                                            setText(undefined);
                                        }

                                        handleChange(event);
                                    }}
                                    options={[
                                        { value: 'text', label: 'Texto' },
                                        { value: 'slider', label: 'Slider' },
                                        { value: 'article', label: 'Artigo' }
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={8}>
                            <Form.Item
                                label="Titulo"
                                name="title"
                                rules={[
                                    {
                                        required:
                                            values.contentType === 'article',
                                        message: 'Digite o título.'
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
                        <Col md={8}>
                            <Form.Item
                                label="Subtítulo"
                                name="subTitle"
                                rules={[
                                    {
                                        required:
                                            values.contentType === 'article',
                                        message: 'Digite o subtítulo.'
                                    }
                                ]}
                            >
                                <Input
                                    name="subTitle"
                                    value={values.subTitle}
                                    onChange={handleChange}
                                    placeholder="Digite seu subtítulo..."
                                />
                            </Form.Item>
                        </Col>

                        {values.contentType !== 'slider' && (
                            <Col md={24}>
                                <Form.Item
                                    label="Texto"
                                    name={'text'}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Por favor, digite o texto!'
                                        }
                                    ]}
                                >
                                    <SunEditor
                                        name="text"
                                        height="400"
                                        setAllPlugins={true}
                                        lang={'pt_br'}
                                        placeholder="Digite seu texto..."
                                        setOptions={{
                                            imageGalleryHeader: {
                                                authorization: `Bearer ${token}`
                                            },
                                            imageGalleryUrl:
                                                'http://localhost:3001/content-gallery',
                                            defaultStyle:
                                                'font-family: verdana; font-size: 14px;',
                                            plugins: plugins,
                                            fontSize: [8, 10, 14, 18, 24, 36],
                                            buttonList: [
                                                // default
                                                ['undo', 'redo'],
                                                [
                                                    ':p-More Paragraph-default.more_paragraph',
                                                    'font',
                                                    'fontSize',
                                                    'formatBlock',
                                                    'paragraphStyle',
                                                    'blockquote'
                                                ],
                                                [
                                                    'bold',
                                                    'underline',
                                                    'italic',
                                                    'strike',
                                                    'subscript',
                                                    'superscript'
                                                ],
                                                [
                                                    'fontColor',
                                                    'hiliteColor',
                                                    'textStyle'
                                                ],
                                                ['removeFormat'],
                                                ['outdent', 'indent'],
                                                [
                                                    'align',
                                                    'horizontalRule',
                                                    'list'
                                                ],
                                                [
                                                    '-right',
                                                    ':i-More Misc-default.more_vertical',
                                                    'fullScreen',
                                                    'showBlocks',
                                                    'codeView',
                                                    'preview',
                                                    'print'
                                                ],
                                                ['table'],
                                                [
                                                    '-right',
                                                    'imageGallery',
                                                    'video',
                                                    'audio',
                                                    'link'
                                                ],
                                                // (min-width: 992)
                                                [
                                                    '%992',
                                                    [
                                                        ['undo', 'redo'],
                                                        [
                                                            ':p-More Paragraph-default.more_paragraph',
                                                            'font',
                                                            'fontSize',
                                                            'formatBlock',
                                                            'paragraphStyle',
                                                            'blockquote'
                                                        ],
                                                        [
                                                            'bold',
                                                            'underline',
                                                            'italic',
                                                            'strike'
                                                        ],
                                                        [
                                                            ':t-More Text-default.more_text',
                                                            'subscript',
                                                            'superscript',
                                                            'fontColor',
                                                            'hiliteColor',
                                                            'textStyle'
                                                        ],
                                                        ['removeFormat'],
                                                        ['outdent', 'indent'],
                                                        [
                                                            'align',
                                                            'horizontalRule',
                                                            'list'
                                                        ],
                                                        [
                                                            '-right',
                                                            ':i-More Misc-default.more_vertical',
                                                            'fullScreen',
                                                            'showBlocks',
                                                            'codeView',
                                                            'preview',
                                                            'print'
                                                        ],
                                                        [
                                                            '-right',
                                                            ':r-More Rich-default.more_plus',
                                                            'table',
                                                            'link',
                                                            'imageGallery',
                                                            'video',
                                                            'audio'
                                                        ]
                                                    ]
                                                ],
                                                // (min-width: 767)
                                                [
                                                    '%767',
                                                    [
                                                        ['undo', 'redo'],
                                                        [
                                                            ':p-More Paragraph-default.more_paragraph',
                                                            'font',
                                                            'fontSize',
                                                            'formatBlock',
                                                            'paragraphStyle',
                                                            'blockquote'
                                                        ],
                                                        [
                                                            ':t-More Text-default.more_text',
                                                            'bold',
                                                            'underline',
                                                            'italic',
                                                            'strike',
                                                            'subscript',
                                                            'superscript',
                                                            'fontColor',
                                                            'hiliteColor',
                                                            'textStyle'
                                                        ],
                                                        ['removeFormat'],
                                                        ['outdent', 'indent'],
                                                        [
                                                            ':e-More Line-default.more_horizontal',
                                                            'align',
                                                            'horizontalRule',
                                                            'list'
                                                        ],
                                                        [
                                                            ':r-More Rich-default.more_plus',
                                                            'table',
                                                            'link',
                                                            'imageGallery',
                                                            'video',
                                                            'audio'
                                                        ],
                                                        [
                                                            '-right',
                                                            ':i-More Misc-default.more_vertical',
                                                            'fullScreen',
                                                            'showBlocks',
                                                            'codeView',
                                                            'preview',
                                                            'print'
                                                        ]
                                                    ]
                                                ],
                                                // (min-width: 480)
                                                [
                                                    '%480',
                                                    [
                                                        ['undo', 'redo'],
                                                        [
                                                            ':p-More Paragraph-default.more_paragraph',
                                                            'font',
                                                            'fontSize',
                                                            'formatBlock',
                                                            'paragraphStyle',
                                                            'blockquote'
                                                        ],
                                                        [
                                                            ':t-More Text-default.more_text',
                                                            'bold',
                                                            'underline',
                                                            'italic',
                                                            'strike',
                                                            'subscript',
                                                            'superscript',
                                                            'fontColor',
                                                            'hiliteColor',
                                                            'textStyle',
                                                            'removeFormat'
                                                        ],
                                                        [
                                                            ':e-More Line-default.more_horizontal',
                                                            'outdent',
                                                            'indent',
                                                            'align',
                                                            'horizontalRule',
                                                            'list'
                                                        ],
                                                        [
                                                            ':r-More Rich-default.more_plus',
                                                            'table',
                                                            'link',
                                                            'imageGallery',
                                                            'video',
                                                            'audio'
                                                        ],
                                                        [
                                                            '-right',
                                                            ':i-More Misc-default.more_vertical',
                                                            'fullScreen',
                                                            'showBlocks',
                                                            'codeView',
                                                            'preview',
                                                            'print'
                                                        ]
                                                    ]
                                                ]
                                            ]
                                        }}
                                        getSunEditorInstance={
                                            getSunEditorInstance
                                        }
                                        onChange={(value: any) => {
                                            setText(value);
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        )}

                        {values.contentType !== 'text' && (
                            <Col md={24}>
                                <Form.Item
                                    label="Imagem"
                                    name="url"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'A url é obrigatória.'
                                        }
                                    ]}
                                >
                                    <Input
                                        name="url"
                                        value={values.url}
                                        onClick={() => props.onClick()}
                                        onChange={handleChange}
                                        size="large"
                                        placeholder="Digite a url..."
                                        suffix={
                                            <Button
                                                size="large"
                                                onClick={() => {
                                                    props.onClick();
                                                    showModal();
                                                }}
                                                icon={<FaImages size={30} />}
                                            />
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        )}

                        {values.contentType !== 'text' && (
                            <Col span={24}>
                                <Row justify={'center'} className="text-center">
                                    <Col span={24}>
                                        <Image src={values.url} width={400} />
                                    </Col>
                                </Row>
                            </Col>
                        )}

                        <Col md={24} className="mt-5">
                            <Row justify={'center'} gutter={[30, 0]}>
                                <Col>
                                    <Button type="primary" htmlType="submit">
                                        <strong>Enviar</strong>
                                    </Button>
                                </Col>

                                <Col>
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
                <Modal
                    style={{ top: 20 }}
                    title={
                        <Row gutter={[0, 30]} className="mb-5">
                            <Col md={24}>
                                <p>Galeria de Imagens</p>
                            </Col>
                            <Col md={24}>
                                {startOptionsGallery().map((value, index) => {
                                    const tag = value.tag;
                                    return (
                                        <Radio.Button
                                            key={index}
                                            checked={
                                                tags.filter(
                                                    (value) => value === tag
                                                ).length !== 0
                                            }
                                            onClick={() => {
                                                selectButtom(tag);
                                            }}
                                            value={value.tag}
                                        >
                                            {value.tag}
                                        </Radio.Button>
                                    );
                                })}
                            </Col>
                            <Divider />
                        </Row>
                    }
                    width="100%"
                    open={isModalOpen}
                    onCancel={handleOk}
                    footer={[
                        <Button key="back" onClick={handleOk}>
                            Sair
                        </Button>
                    ]}
                >
                    <div style={{ height: 400, overflow: 'auto' }}>
                        <Row justify={'center'} gutter={[0, 50]}>
                            {startGallery().map((value, index) => {
                                return (
                                    <Col
                                        md={7}
                                        key={index}
                                        className="text-center"
                                    >
                                        <Card
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={
                                                <Image
                                                    src={value.src}
                                                    style={{
                                                        alignItems: 'center'
                                                    }}
                                                />
                                            }
                                        >
                                            <Meta
                                                title={value.tag}
                                                description={
                                                    <Row className="w-100">
                                                        <Col span={24}>
                                                            {value.alt}
                                                        </Col>
                                                        <Col md={24}>
                                                            <Button
                                                                type="default"
                                                                size="large"
                                                                title="Selecionar"
                                                                onClick={() => {
                                                                    setValues({
                                                                        ...values,
                                                                        url: value.src
                                                                    });
                                                                    handleOk();
                                                                }}
                                                            >
                                                                <strong>
                                                                    Selecionar
                                                                </strong>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                }
                                            ></Meta>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </Modal>
            </Col>
        </Row>
    );

    async function save() {
        messageApi.open({
            key: 'content.registration',
            type: 'loading',
            content: 'Enviando...',
            duration: 7
        });

        const dataValues: Content = {
            title: values.title,
            subTitle: values.subTitle,
            text: text,
            page: values.page,
            contentType: values.contentType,
            url: values.contentType !== 'text' ? values.url : undefined
        };

        const request = await ContentController.store(dataValues);

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
                setText(undefined);
            }
        }, 1000);
    }

    function startGallery() {
        const options: any[] = [...tags];
        let newGallery: any[] = [];

        gallery.map((value) => {
            if (options.filter((option) => option === value.tag).length) {
                newGallery.push(value);
            }
        });
        if (!options.length) {
            newGallery = [...gallery];
        }

        return newGallery;
    }

    function startOptionsGallery() {
        const options: any[] = [];

        gallery.map((value) => {
            if (!options.filter((option) => option.tag === value.tag).length) {
                options.push(value);
            }
        });

        return options.sort((a, b) =>
            a.tag.toUpperCase().localeCompare(b.tag.toUpperCase())
        );
    }

    function selectButtom(valueTag: string) {
        const haveTag = tags.filter((tag) => tag === valueTag);
        const list = [...tags];
        if (haveTag.length) {
            const remove = list.indexOf(valueTag);
            list.splice(remove, 1);
            setTags(list);
            return;
        }
        setTags([...tags, valueTag]);
    }
};
