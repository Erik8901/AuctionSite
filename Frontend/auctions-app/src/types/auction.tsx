
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

    // Translation fields from the API
    originalLanguage: string | null;
    titleEn: string | null;
    descriptionEn: string | null;
    titleSv: string | null;
    descriptionSv: string | null;
}
