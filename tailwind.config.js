module.exports = {
    content: ['./index.html', './src/**/*.{tsx,ts,jsx,js}'],
    //darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
}
