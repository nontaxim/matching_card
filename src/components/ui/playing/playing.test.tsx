import { screen, render, waitFor, cleanup } from '@testing-library/react'
import user from '@testing-library/user-event'
import Playing from './playing'
import { cards } from '../../../cards'

describe('Playing Component', () => {
    afterEach(cleanup)

    describe('Rendering', () => {
        test('should render header', () => {
            render(<Playing cards={cards} />)
            const header = screen.getByText(/Matching Card/i)
            expect(header).toBeInTheDocument()
        })

        test('should render all cards', () => {
            render(<Playing cards={cards} />)
            const allCards = screen.getAllByTestId('backCard')
            expect(allCards.length).toEqual(cards.length)
            allCards.forEach((card) => {
                expect(card).toBeInTheDocument()
            })
        })

        test('should render restart button', () => {
            render(<Playing cards={cards} />)
            const button = screen.getByRole('button', { name: 'restart' })
            expect(button).toBeInTheDocument()
        })
    })

    describe('Interaction', () => {
        afterEach(cleanup)

        test('should open card when clicked', async () => {
            user.setup()
            render(<Playing cards={cards} />)
            const card = screen.getAllByTestId(cards[0].value.toString())
            await waitFor(async () => await user.click(card[0]))
            await waitFor(() => expect(card[0]).toHaveClass('open'))
        })

        test('should not open card when clicked on the same card twice', async () => {
            user.setup()
            render(<Playing cards={cards} />)
            const card = screen.getAllByTestId(cards[0].value.toString())
            await waitFor(async () => {
                await user.click(card[0])
                await user.click(card[0])
            })
            await waitFor(() => {
                expect(card[0]).toHaveClass('open')
            })
        })

        test('should handle non-matching cards correctly', async () => {
            user.setup()
            render(<Playing cards={cards} />)
            const card1 = screen.getAllByTestId(cards[0].value.toString())
            const card2 = screen.getAllByTestId(cards[1].value.toString())
            await waitFor(async () => {
                await user.click(card1[0])
                await user.click(card2[0])
            })
            await waitFor(() =>
                expect(card1[0]).not.toHaveClass('cursor-default opacity-0'),
            )
            await waitFor(() =>
                expect(card2[0]).not.toHaveClass('cursor-default opacity-0'),
            )
        })

        test('should handle matching cards correctly', async () => {
            user.setup()
            render(<Playing cards={cards} />)
            const matchingCardValue = cards.find(
                (card) => card.value === cards[0].value,
            )?.value
            await waitFor(() => expect(matchingCardValue).toBeDefined())
            if (matchingCardValue === undefined) return
            const matchingCards = screen.getAllByTestId(
                matchingCardValue.toString(),
            )
            await waitFor(async () => {
                await user.click(matchingCards[0])
                await user.click(matchingCards[1])
            })
            await waitFor(() =>
                expect(matchingCards[0]).toHaveClass(
                    'cursor-default opacity-0',
                ),
            )
            await waitFor(() =>
                expect(matchingCards[1]).toHaveClass(
                    'cursor-default opacity-0',
                ),
            )
        })

        test('should show the number of clicks', async () => {
            user.setup()
            render(<Playing cards={cards} />)
            const card = screen.getAllByTestId(cards[0].value.toString())
            await user.click(card[0])
            const clickCount = screen.getByTitle('click count')
            await waitFor(() => expect(clickCount).toHaveTextContent('1'))
        })

        test('should reset the game state when restart button is clicked', async () => {
            user.setup()
            render(<Playing cards={cards} />)
            const card = screen.getAllByTestId(cards[0].value.toString())
            await waitFor(async () => {
                await user.click(card[0])
            })
            const restartButton = screen.getByRole('button', {
                name: 'restart',
            })
            await waitFor(async () => {
                await user.click(restartButton)
            })
            await new Promise((resolve) => setTimeout(resolve, 750))
            await waitFor(() =>
                expect(card[0]).not.toHaveClass('cursor-default opacity-0'),
            )
            const clickCount = screen.getByTitle('click count')
            await waitFor(() => expect(clickCount).toHaveTextContent('0'))
        })
    })
})
