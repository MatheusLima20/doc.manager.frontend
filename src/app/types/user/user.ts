import { AddressUser } from '../address/address';

export type UserType =
    | 'ADM'
    | 'ENTREGADOR'
    | 'CLIENTE'
    | 'FUNCIONARIO'
    | 'CONSUMIDOR'
    | '';

export type UserLogin = {
    email: string;
    password: string;
    companyCNPJ: string;
};

export type UserDataLogged = {
    name: string;
    userType: UserType;
    token: string;
    platformName: string;
};

export type UserMain = {
    id?: number;
    platformCPFCNPJ?: string;
    platformName: string;
    cpfcnpj: string;
    companyName: string;
    corporateName: string;
    address: AddressUser;
    userName: string;
    email: string;
    password: string;
    passwordRepeated?: string;
    userType?: string | number;
};

export type UserCustomer = {
    id?: number;
    cpf: string;
    cpfcnpj?: string;
    isActive?: boolean;
    password: string;
    passwordRepeated?: string;
    userName: string;
    email: string;
    userType: string;
};

export type UserProfile = {
    id: number;
    orderAverage: number;
};
