interface HeaderProps {
    title: string;
}

export const Header = ({title}: HeaderProps) => {
    return (
        <header className="">
            <p>{title}</p>
        </header>
    )
}