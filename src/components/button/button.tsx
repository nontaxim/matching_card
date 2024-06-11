import { twMerge } from 'tailwind-merge'

interface ButtonProps {
    onClick?: () => void
    children?: React.ReactNode
    className?: string
}

const Button = ({
    onClick,
    children = 'start',
    className,
    ...rest
}: ButtonProps) => {
    return (
        <button className={twMerge('', className)} onClick={onClick} {...rest}>
            {children}
        </button>
    )
}

export default Button
