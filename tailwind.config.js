// tailwind.config.js
export const content = [];
export const theme = {
    extend: {},
};

export const plugins = [
    require('@headlessui/tailwindcss')
    // Or with a custom prefix:
    ,

    // Or with a custom prefix:
    require('@headlessui/tailwindcss')({ prefix: 'ui' })
];