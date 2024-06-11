/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {}
    },
    plugins: [
        require('tailwindcss-3d'),
        function ({ addUtilities }) {
            addUtilities({
                '.backface-hidden': {
                    'backface-visibility': 'hidden',
                    '-webkit-backface-visibility': 'hidden'
                }
            })
        }
    ]
}
