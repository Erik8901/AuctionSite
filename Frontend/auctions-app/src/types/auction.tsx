export interface Auction {
    id: number;
    title: string;
    isDone: Boolean;
    price: number;
    createdBy: string;
    description: string;
    startDate: string;
    endDate: string;
    imgUrl: string;
    category: string;
}