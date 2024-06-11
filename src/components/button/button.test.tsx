import { screen, render } from '@testing-library/react'
import Button from './button'
import user from '@testing-library/user-event'

describe('Button', () => {
    test('renders button with default text', () => {
        render(<Button />)
        const button = screen.getByRole('button', { name: /start/i })
        expect(button).toBeInTheDocument()
    })

    test('renders button with text', () => {
        render(<Button children="Click me" />)
        const button = screen.getByRole('button', { name: /click me/i })
        expect(button).toBeInTheDocument()
    })

    test('calls onClick when button is clicked', async () => {
        user.setup()
        const onClick = jest.fn()
        render(<Button children="Click me" onClick={onClick} />)
        const button = screen.getByRole('button', { name: /click me/i })
        await user.click(button)
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
