import { useEffect, useState } from "react";

export const useThemes = () => {
  const [Header, setHeader] = useState<any>(null);
  const [StripeA, setStripeA] = useState<any>(null);
  const [StripeB, setStripeB] = useState<any>(null);
  const [Hover, setHover] = useState<any>(null);
  const [Footer, setFooter] = useState<any>(null);
  const [Disabled, setDisabled] = useState<any>(null);
  const [Expandable, setExpandable] = useState<any>(null)

  useEffect(() => {
    (async () => {
      const themeContainer = document.getElementById("theme-container");
      if (themeContainer) {
        setHeader(
          `rgba(${getComputedStyle(themeContainer).getPropertyValue(
            "--color-primary"
          )}, 0.7)`
        );
        setStripeA(
          `rgba(${getComputedStyle(themeContainer).getPropertyValue(
            "--color-tableStripeA"
          )}, 1)`
        );
        setStripeB(
          `rgba(${getComputedStyle(themeContainer).getPropertyValue(
            "--color-primary"
          )}, 0.1)`
        );
        setHover(
          `rgba(${getComputedStyle(themeContainer).getPropertyValue(
            "--color-secondary"
          )}, 0.2)`
        );
        setFooter(
          `rgba(${getComputedStyle(themeContainer).getPropertyValue(
            "--color-primary"
          )}, 0.2)`
        );
        setDisabled(
          `rgba(${getComputedStyle(themeContainer).getPropertyValue(
            "--color-primary"
          )}, 0.5)`
        );
        setExpandable(
          `rgba(${getComputedStyle(themeContainer).getPropertyValue(
            "--color-expandableRow"
          )}, 0.11)`
        );
      }
    })();
  }, []);

  const primary = Header; // Header / Primary Color
  const text = "#f6f6f6"; // Font Color
  const basic = StripeA; // Default Color Row
  const striped = StripeB; // Stripe Color Row
  const hover = Hover; // Hover Row Color
  const defaultText = "#000"; // Default Text Color
  const expandableRow = Expandable; // Fondo de las row expandible
  const disable = Disabled;
  const footer = Footer;

  const Themes = {
    PinkStyle: {
      headCells: {
        style: {
          backgroundColor: "#F7F0FF !important",
          borderBottom: "1px solid #420A61",
          color: "#000000 !important",
        },
      },
      header: {
        style: {
          display: "none",
          color: "#000",
        },
      },
      headRow: {
        style: {
          color: "#000 !important",
        },
      },
    },

    WithoutHeader: {
      header: {
        style: {
          display: "none",
          color: "#000",
        },
      },
    },

    WithoutHeaderPaginationOut: {
      headCells: {
        style: {
          backgroundColor: `${primary}`,
          color: `${text}`,
        },
      },
      headRow: {
        style: {
          backgroundColor: `${primary}`,
          color: `${text}`,
        },
      },
      header: {
        style: {
          display: "none",
          color: `${defaultText}`,
        },
      },
      rows: {
        style: {
          color: `${defaultText}`,
          backgroundColor: `${basic}`,
          "&:nth-child(even)": {
            color: `${defaultText}`,
            backgroundColor: `${striped}`,
          },
          "&:hover": {
            color: `${defaultText}`,
            backgroundColor: `${hover}`,
          },
        },
      },
      pagination: {
        style: {
          position: "fixed",
          bottom: "0",
          right: "0",
          color: `${primary}`,
          backgroundColor: `${footer}`,
          width: "100%",
          transition: "0.5s all ease",
        },
        pageButtonsStyle: {
          cursor: "pointer",
          fill: `${primary}`,
          backgroundColor: "transparent",
          "&:disabled": {
            cursor: "unset",
            fill: `${disable}`,
          },
          "&:hover:not(:disabled)": {
            backgroundColor: `${striped}`,
          },
        },
      },
      expanderRow: {
        style: {
          color: `${defaultText}`,
          backgroundColor: `${expandableRow}`,
        },
      },
    },

    WithoutHeaderPaginationOut2: {
      headCells: {
        style: {
          backgroundColor: `${primary}`,
          color: `${text}`,
        },
      },
      headRow: {
        style: {
          backgroundColor: `${primary}`,
          color: `${text}`,
        },
      },
      header: {
        style: {
          display: "none",
          color: `${defaultText}`,
        },
      },
      rows: {
        style: {
          color: `${defaultText}`,
          backgroundColor: `${basic}`,
          "&:nth-child(even)": {
            color: `${defaultText}`,
            backgroundColor: `${striped}`,
          },
          "&:hover": {
            color: `${defaultText}`,
            backgroundColor: `${hover}`,
          },
        },
      },
      pagination: {
        style: {
          position: "fixed",
          bottom: "0",
          right: "0",
          color: `${text}`,
          backgroundColor: `${primary}`,
          width: "calc(100vw - 150px)",
          transition: "0.5s all ease",
        },
        pageButtonsStyle: {
          cursor: "pointer",
          fill: `${primary}`,
          backgroundColor: "transparent",
          "&:disabled": {
            cursor: "unset",
            fill: `${disable}`,
          },
          "&:hover:not(:disabled)": {
            backgroundColor: `${striped}`,
          },
        },
      },
      expanderRow: {
        style: {
          color: `${defaultText}`,
          backgroundColor: `${expandableRow}`,
        },
      },
    },

    TableModal: {
      headCells: {
        style: {
          backgroundColor: `${primary}`,
          color: `${text}`,
        },
      },
      headRow: {
        style: {
          backgroundColor: `${primary}`,
          color: `${text}`,
        },
      },
      header: {
        style: {
          display: "none",
          color: `${defaultText}`,
        },
      },
      rows: {
        style: {
          color: `${defaultText}`,
          backgroundColor: `${basic}`,
          "&:nth-child(even)": {
            color: `${defaultText}`,
            backgroundColor: `${striped}`,
          },
          "&:hover": {
            color: `${defaultText}`,
            backgroundColor: `${hover}`,
          },
        },
      },
      pagination: {
        style: {
          color: `${primary}`,
          transition: "0.5s all ease",
        },
        pageButtonsStyle: {
          cursor: "pointer",
          fill: `${primary}`,
          backgroundColor: "transparent",
          "&:disabled": {
            cursor: "unset",
            fill: `${disable}`,
          },
          "&:hover:not(:disabled)": {
            backgroundColor: `${striped}`,
          },
        },
      },
      expanderRow: {
        style: {
          color: `${defaultText}`,
          backgroundColor: `${expandableRow}`,
        },
      },
    },
  };

  return Themes;
};
