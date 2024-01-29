interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

const Box = () => {
    return (
        <div>
            {children}
        </div>
    )
}

export default Box;