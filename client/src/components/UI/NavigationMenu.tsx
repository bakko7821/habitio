interface NavigationMenuProps {
    onClose: () => void;
}

export const NavigationMenu = ({onClose}: NavigationMenuProps) => {
    return (
        <nav>
            <p>123</p>
            <p>123</p>
            <p>123</p>
            <button onClick={onClose}>Close</button>
        </nav>
    )
}