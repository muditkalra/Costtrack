import { JSX } from "react";

export interface Feature {
    title: string;
    icon: JSX.Element;
    description: string;
}

export interface Product {
    id: string;
    created_at: string;
    user_id: string;
    url: string;
    name: string;
    current_price: number;
    currency: string;
    image_url: string;
    updated_at: string;
}