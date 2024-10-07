/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat'],
      },
      fontSize: {
        xxs: ["10px", "14px"],
      },
      backgroundImage: {
        "login-img": "var(--bg-login-img)",
        "logo-company-white": "var(--img-logo-company-white)",
        "logo-company": "var(--img-logo-company)",
      },
      boxShadow: {
        input: "5px 5px 4px rgba(0,0,0,0.15)",
        container: "3px 3px 3px rgba(0,0,0,0.25)",
        check: "0 0 0 0.25rem #68ad9c91;",
      },
      dropShadow:{
        input: "5px 5px 4px rgba(0,0,0,0.15)",
        container: "3px 3px 3px rgba(0,0,0,0.25)",
        check: "0 0 0 0.25rem #68ad9c91;",
      },
      borderWidth: {
        1: "1px",
      },
      colors: {
        skin: {
          primary: ({ opacityValue }) => {
            if (opacityValue != undefined) {
              return `rgba(var(--color-primary),${opacityValue})`;
            }
            return `rgb(var(--color-primary))`;
          },

          secondary: ({ opacityValue }) => {
            if (opacityValue != undefined) {
              return `rgba(var(--color-secondary),${opacityValue})`;
            }
            return `rgb(var(--color-secondary))`;
          },

          third: ({ opacityValue }) => {
            if (opacityValue != undefined) {
              return `rgba(var(--color-third),${opacityValue})`;
            }
            return `rgb(var(--color-third))`;
          },

          mainBG: ({ opacityValue }) => {
            if (opacityValue != undefined) {
              return `rgba(var(--color-mainBG),${opacityValue})`;
            }
            return `rgb(var(--color-mainBG))`;
          },

          cardBody: ({ opacityValue }) => {
            if (opacityValue != undefined) {
              return `rgba(var(--color-cardBody),${opacityValue})`;
            }
            return `rgb(var(--color-cardBody))`;
          },

          sideBG: ({ opacityValue }) => {
            if (opacityValue != undefined) {
              return `rgba(var(--color-sideBG),${opacityValue})`;
            }
            return `rgb(var(--color-sideBG))`;
          },

          sideIconsBG: ({ opacityValue }) => {
            if (opacityValue != undefined) {
              return `rgba(var(--color-sideIconsBG),${opacityValue})`;
            }
            return `rgb(var(--color-sideIconsBG))`;
          },

          toolTipText: ({ opacityValue }) => {
            if (opacityValue != undefined) {
              return `rgba(var(--color-toolTipText),${opacityValue})`;
            }
            return `rgb(var(--color-toolTipText))`;
          },

          modalHeader: ({ opacityValue }) => {
            if (opacityValue != undefined) {
              return `rgba(var(--color-modalHeader),${opacityValue})`;
            }
            return `rgb(var(--color-modalHeader))`;
          },

          tableStripeA: ({ opacityValue }) => {
            if (opacityValue != undefined) {
              return `rgba(var(--color-tableStripeA),${opacityValue})`;
            }
            return `rgb(var(--color-tableStripeA))`;
          },

          cancelBtnText: ({ opacityValue }) => {
            if (opacityValue != undefined) {
              return `rgba(var(--color-cancelBtnText),${opacityValue})`;
            }
            return `rgb(var(--color-cancelBtnText))`;
          },
          sideBGHover: ({ opacityValue }) => {
            if (opacityValue != undefined) {
              return `rgba(var(--color-sideBGHover),${opacityValue})`;
            }
            return `rgb(var(--color-sideBGHover))`;
          },
          sideText: ({ opacityValue }) => {
            if (opacityValue != undefined) {
              return `rgba(var(--color-sideText),${opacityValue})`;
            }
            return `rgb(var(--color-sideText))`;
          },
          sideTextHover: ({ opacityValue }) => {
            if (opacityValue != undefined) {
              return `rgba(var(--color-sideTextHover),${opacityValue})`;
            }
            return `rgb(var(--color-sideTextHover))`;
          },
        },
      },
      keyframes: {
        sideOut: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        sideOut: "sideOut 1s ease-in-out",
      },
      rotate: {
        360: "360deg",
      },
    },
  },
  // plugins: [require("@xpd/tailwind-3dtransforms")],
};
