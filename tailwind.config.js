/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        boxShadow: {
            'soft': '0 2px 8px 0 rgba(51, 51, 51, 0.1)',
            'medium': '0 18px 20px 1px rgba(51, 51, 51, 0.1)',
            'hard': '0 8px 10px 1px rgba(51, 51, 51, 0.1)',
            'soft-top': '0 -2px 8px 0 rgba(51, 51, 51, 0.1)',
            'medium-top': '0 -18px 20px 1px rgba(51, 51, 51, 0.1)',
            'hard-top': '0 -8px 10px 1px rgba(51, 51, 51, 0.1)',
        },
        fontSize: {
            'program-title': ['24px', '30px'],
            'heading-1': ['24px', '30px'],
            'heading-2': ['24px', '26px'],
            'heading-3': ['22px', '24px'],
            'heading-4': ['22px', '24px'],
            'body-1': ['16px', '18px'],
            'body-2': ['14px', '16px'],
            'paragraph-1': ['16px', '18px'],
            'paragraph-2': ['16px', '18px'],
            'paragraph-3': ['14px', '16px'],
            'label-1': ['14px', '24px'],
            'label-2': ['14px', '24px'],
            'label-3': ['14px', '24px'],
            'label-4': ['14px', '16px'],
            'label-5': ['8px', '10px'],
            'label-6': ['14px', '16px'],
        },
        colors: {
            "text-100": "#333333",
            "text-200": "#5b4a4c",
            "placeholder": "#676767",
            "neutral-900": "#3a3a3a",
            "neutral1": "#828282",
            "neutral2": "#bdbdbd",
            "neutral3": "#c0c0c0",
            "neutral4": "#e0e0e0",
            "neutral5": "#f5f6fa",
            "neutral6": "#f2f2f2",
            "neutral7": "#fafafa",
            "neutral8": "#ffffff",
            "persian-blue-500": "#2325ba",
            "persian-blue1": "#191b9f",
            "persian-blue2": "#111286",
            "persian-blue3": "#060755",
            "persian-blue4": "#5354d1",
            "persian-blue5": "#787ae8",
            "persian-blue6": "#ebedfe",
            "eucalyptus-500": "#4ed39d",
            "eucalyptus1": "#39b58f",
            "eucalyptus2": "#279780",
            "eucalyptus3": "#0e6564",
            "eucalyptus4": "#78e4ad",
            "eucalyptus5": "#96f1ba",
            "eucalyptus6": "#dcfce3",
            "gamboge-500": "#ec9808",
            "gamboge1": "#ca7a05",
            "gamboge2": "#a96004",
            "gamboge3": "#713701",
            "gamboge4": "#f3b943",
            "gamboge5": "#f9ce68",
            "gamboge6": "#fef3cc",
            "cobalt-500": "#0f68ef",
            "cobalt1": "#0a50cd",
            "cobalt2": "#073bac",
            "cobalt3": "#021d72",
            "cobalt4": "#4894f5",
            "cobalt5": "#6db0fa",
            "cobalt6": "#cee9fe",
            "crimson-500": "#ff3838",
            "crimson1": "#db2838",
            "crimson2": "#b71c37",
            "crimson3": "#7a0a31",
            "crimson4": "#ff7669",
            "crimson5": "#ff9c87",
            "crimson6": "#ffe3d5",
            "deep-lemon-500": "#fdce1b",
            "deep-lemon1": "#d9ac13",
            "deep-lemon2": "#b68b0d",
            "deep-lemon3": "#795705",
            "deep-lemon4": "#fdde53",
            "deep-lemon5": "#fee776",
            "deep-lemon6": "#fef9d1",
            "mint-500": "#08aa87",
            "mint1": "#058c80",
            "mint2": "#047475",
            "mint3": "#013f4e",
            "mint4": "#39c7a0",
            "mint5": "#61e3b3",
            "mint6": "#cafadf",
            "light-border": 1,
            "radius-2": 2,
            "radius-4": 4,
            "radius-10": 10,
            "radius-20": 20,
            "persian-blue7": "#bdbee8",
            "neutral9": "#d8d8d8",
            "neutral10": "#ececec"
        }
    },
  },
  plugins: [],
}