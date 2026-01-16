export interface MatrixCardProps {
    type: string;
    title: string;
    description: string;
    color: string;
    elements: MatrixCardElementProps[]
}

export interface MatrixCardElementProps {
    id: number;
    title: string;
}