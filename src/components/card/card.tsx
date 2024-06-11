import { CardProps } from './card.types'
import { twMerge } from 'tailwind-merge'

const Card = ({
    url,
    name,
    value,
    isOpen,
    index,
    isClear,
    onClick,
}: CardProps) => {
    return (
        <div
            data-testid={value}
            onClick={(e) => onClick && onClick(e, value, index)}
            className={twMerge(
                `group h-32 w-32 cursor-pointer rounded-lg bg-transparent opacity-100 transition-opacity duration-700 perspective-1000`,
                isClear
                    ? 'cursor-default opacity-0'
                    : isOpen
                      ? 'open'
                      : 'hover:opacity-60',
            )}
        >
            <div
                className={twMerge(
                    `relative h-[100%] w-[100%] rounded-lg text-center transition-transform duration-700 transform-style-3d`,
                    isOpen ? 'rotate-y-180' : '',
                )}
            >
                <div
                    data-testid={'backCard'}
                    className="absolute flex h-[100%] w-[100%] flex-col justify-center rounded-lg border bg-slate-800 shadow-md backface-hidden"
                >
                    {/* <p className="title">Close</p> */}
                </div>
                <div
                    className={`absolute flex h-[100%] w-[100%] flex-col justify-center rounded-lg border shadow-md rotate-y-180 backface-hidden`}
                >
                    <img
                        className="h-full w-full rounded-lg border border-gray-200 object-cover shadow"
                        src={url}
                        alt={name}
                        aria-label={name}
                    />
                </div>
            </div>
        </div>
    )
}

export default Card
