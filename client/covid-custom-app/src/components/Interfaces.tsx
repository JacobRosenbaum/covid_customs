export interface Customer {
    customerId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    addressLine: string;
    city: string;
    State: string;
    zipCode: number;
    phone: string;
    role: string;
};

export interface MaskInterface {
    maskId: number;
    material: string;
    style: string;
    colors: String[];
    cost: number;
    image: string;
    custom: boolean;
    deleted: boolean;
}

export interface MaskOrder {
    mask: MaskInterface;
    quantity: number;
};

export interface Order {
    orderId: number;
    customer: Customer;
    masks: MaskOrder[];
    total: number;
    purchased: boolean,
    purchaseDate?: Date;
}

export interface Color {
    red: boolean;
    orange: boolean;
    blue: boolean;
    white: boolean;
    black: boolean;
    green: boolean;
    violet: boolean;
}