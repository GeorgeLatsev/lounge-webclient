module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: [],
    theme: {
        extend: {
            colors: {
                "c1": "#D9D9D9",
                "c2": "#8C8C8C",
                "c3": "#595959",
                "c4": "#262626",
                "c5": "#0D0D0D"
            },
            width: {
                "60": "15rem",
                "72": "18rem",
                "104": "26rem",
                "112": "28rem",
                "screen-8": "calc(100vw - 2rem)",
                "screen-10": "calc(100vw - 2.5rem)",
                "screen-12": "calc(100vw - 3rem)",
                "screen-16": "calc(100vw - 4rem)",
                "screen-24": "calc(100vw - 6rem)",
                "screen-28": "calc(100vw - 7rem)",
                "screen-32": "calc(100vw - 8rem)",
                "screen-36": "calc(100vw - 9rem)",
                "screen-108": "calc(100vw - 27rem)",
                "screen-128": "calc(100vw - 32rem)",
            },
            height: {
                "screen-8": "calc(100vh - 2rem)",
                "screen-10": "calc(100vh - 2.5rem)",
                "screen-12": "calc(100vh - 3rem)",
                "screen-16": "calc(100vh - 4rem)",
                "screen-20": "calc(100vh - 5rem)",
                "screen-24": "calc(100vh - 6rem)",
                "screen-28": "calc(100vh - 7rem)",
                "screen-32": "calc(100vh - 8rem)",
                "screen-36": "calc(100vh - 9rem)",
            },
            inset: {},
        },
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'group-hover'],
        display: ['responsive', 'hover', 'focus', 'group-hover'],
    },
    plugins: [],
};
