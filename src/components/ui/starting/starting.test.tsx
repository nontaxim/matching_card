import { screen, render } from '@testing-library/react'
import Starting from './starting'
import user from '@testing-library/user-event'

describe('Starting part', () => {
    test('should render header', () => {
        render(<Starting />)
        const header = screen.getByText(/Matching Card/i)
        expect(header).toBeInTheDocument()
    })

    test('should render button', () => {
        render(<Starting />)
        const button = screen.getByRole('button', { name: /get started/i })
        expect(button).toBeInTheDocument()
    })

    test('should hide the starting component when button is clicked', async () => {
        user.setup()
        render(<Starting />)
        const button = screen.getByRole('button', { name: /get started/i })
        await user.click(button)
        const startingComponent = screen.getByText(/Matching Card/i)
        expect(startingComponent).toHaveClass('hidden')
    })
})
