module.exports = {
    prefix: '',
    purge: {
        enabled: false,
        content: ['./src/**/*.html', './src/**/*.ts'],
    },
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: "#6332f6",
            },
        },
        spacing: {
            0: "0px",
            0.5: "0.5px",
            1: "1px",
            1.5: "1.5px",
            2: "2px",
            2.5: "2.5px",
            3: "3px",
            3.5: "3.5px",
            4: "4px",
            5: "5px",
            6: "6px",
            7: "7px",
            8: "8px",
            9: "9px",
            10: "10px",
        },
        colors: {
            'picton-blue': {
                light: '#337AB7',
                DEFAULT: '#337AB7',
                dark: '#14b367',
            },
            'nav-hover-blue': {
                DEFAULT: '#286090',
            },
            'nav-menu-active': {
                DEFAULT: '#1d4568',
            },
            'new': {
                DEFAULT: '#D9EDF7',
            },
            'white': {
                DEFAULT: '#FFF',
            },
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
