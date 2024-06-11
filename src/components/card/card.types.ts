export interface CardProps {
    // Define the props for your card component here
    url: string
    name: string
    value: number
    index: number
    isOpen: boolean
    isClear?: boolean
    onClick?: (
        e: React.MouseEvent<HTMLElement>,
        value: number,
        index: number,
    ) => void
}
