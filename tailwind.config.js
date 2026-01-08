/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                terracotta: {
                    50: '#fff8f5',
                    100: '#ffefe8',
                    200: '#ffdcd1',
                    300: '#ffbfad',
                    400: '#ff9676',
                    500: '#ff6f47',
                    600: '#ed4f26',
                    700: '#c53818',
                    800: '#a32f18',
                    900: '#832a18',
                    950: '#47130a',
                },
                olive: {
                    50: '#f6f8ee',
                    100: '#eaefd9',
                    200: '#d7e2b7',
                    300: '#bacf8c',
                    400: '#9ebc63',
                    500: '#7fa141',
                    600: '#638031',
                    700: '#4e652a',
                    800: '#405126',
                    900: '#364423',
                    950: '#1c2411',
                },
                cream: {
                    DEFAULT: '#FDFBF7',
                    50: '#FDFBF7',
                    100: '#FDFBF7',
                }
            },
            fontFamily: {
                display: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
