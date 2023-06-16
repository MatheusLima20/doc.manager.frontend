import React from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { Card } from 'react-bootstrap';
import { CgCheckR } from 'react-icons/cg';
import { ImPlus } from 'react-icons/im';
import './about.css';

const aboutCards = [
    {
        title: 'Compromisso',
        text: 'A nossa satisfação está em servir.',
        className: 'row p-4',
        icon: <ImPlus />
    },
    {
        title: 'Tecnologia',
        subtitle: 'A tecnologia está presente em todos os nossos processos.',
        className: 'row p-4 border-top border-bottom',
        icon: <ImPlus />
    },
    {
        title: 'Segurança',
        subtitle:
            'Envio de notificações personalizadas diretamente ao cliente.',
        className: 'row p-4',
        icon: <ImPlus />
    }
];

const cultureCards = [
    {
        title: 'Visão',
        text:
            'Crescimento sustentável e contínuo, ' +
            'reconhecido nacionalmente como referência no ' +
            'segmento de entregas pela agilidade e excelência nos ' +
            'serviços, através de uma equipe de alta performance, ' +
            'comprometida com a qualidade dos negócios de nosso cliente.'
    },
    {
        title: 'Missão',
        text:
            'Oferecer melhores soluções dos nossos ' +
            'serviços de maneira criativa e inovadora ' +
            'para e com os clientes, com atendimento de ' +
            'qualidade, ágil e competente.'
    },
    {
        title: 'Valores',
        text: (
            <>
                <CgCheckR /> Comprometimento <br />
                <CgCheckR /> Foco no cliente <br />
                <CgCheckR /> Rapidez e precisão <br />
                <CgCheckR /> Crescimento sustentável <br />
                <CgCheckR /> Valorização do colaborador <br />
                <CgCheckR /> Ética
            </>
        )
    }
];

export const AboutScreen = () => {
    return (
        <div className="container-fluid">
            <div className="row m-3 mt-5">
                <Card className="border-0 shadow-lg p-3 mb-5 bg-body rounded">
                    <div className="row justify-content-center mb-5">
                        <div className="col m-5">
                            <h1>
                                <strong>Quem Somos</strong>
                            </h1>
                        </div>
                    </div>

                    <div className="row m-4 justify-content-between">
                        <div className="col-md-6 text-start ">
                            <h2 className="text-color">
                                <strong>Sobre Nós</strong>
                            </h2>
                            <p className="fs-6 m-3">
                                Somos uma transportadora que oferece aos
                                clientes uma completa infraestrutura de
                                serviços, com centros de distribuição e
                                tecnologia de ponta. Trabalhamos com rapidez,
                                qualidade e segurança, proporcionando resultados
                                mais eficientes para suas operações. Com
                                especialização em last mile, possuímos uma
                                dedicada equipe de apoio e acompanhamento dos
                                serviços para garantir o atendimento
                                personalizado e a satisfação dos clientes.
                                Operamos um sofisticado e eficaz sistema
                                logístico, que nos permite estar nos principais
                                mercados do Brasil, oferecendo soluções de forma
                                rápida, econômica e no prazo certo que o cliente
                                necessita.
                            </p>
                        </div>
                        <div
                            className="
                            col-md-5 
                            text-color-white 
                            lh-sm mt-2 fs-6 
                            secondary-background-color 
                            rounded
                            "
                        >
                            <AnimationOnScroll
                                initiallyVisible={false}
                                animatePreScroll={false}
                                animateIn="animate__fadeInRight"
                                animateOut="animate__fadeOutRight"
                            >
                                {aboutCards.map((values, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={values.className}
                                        >
                                            <p className="text-start">
                                                <strong>{values.icon}</strong>
                                            </p>
                                            <p className="text-center">
                                                <strong>{values.title}</strong>

                                                <br />
                                                {values.text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </AnimationOnScroll>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="row m-3 mt-5 mb-5">
                <Card className="border-0 shadow-lg p-3 mb-5 secondary-background-color rounded">
                    <div className="row m-3">
                        <h1 className="text-center text-color-white">
                            <strong>Cultura da Empresa</strong>
                        </h1>
                    </div>

                    <AnimationOnScroll
                        initiallyVisible={false}
                        animatePreScroll={false}
                        animateIn="animate__fadeInUp"
                        animateOut="animate__fadeOutDown"
                    >
                        <div className="row g-0 p-3 justify-content-center text-center card-about">
                            {cultureCards.map((values, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="
                                            col m-2 p-4 text-start 
                                            primary-background-color rounded "
                                    >
                                        <div className="row">
                                            <h4 className="text-center">
                                                <strong>{values.title}</strong>
                                            </h4>
                                            <p className="fs-6 p-4">
                                                {values.text}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </AnimationOnScroll>
                </Card>
            </div>
        </div>
    );
};
