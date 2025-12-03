export interface Property{
    id: number;
    title:string;
    price:string;
    address:string;
    beds:number;
    baths:number;
    type:string;
    imageUrl:string;
    badge:string;
    latitude:string;
    longitude:string;
    isRoommateOption?:boolean;
}