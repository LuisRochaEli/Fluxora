import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";

export const DropdownLenguaje = () => {
  const CurentLenguaje = useState(1);
  const [t, i18n] = useTranslation("global");

  return (
    <Dropdown
      id="ddlLenguaje"
      drop="down"
      className="bg-skin-primary/60 rounded-md hover:bg-skin-primary active:bg-skin-primary focus:bg-skin-primary"
    >
      <Dropdown.Toggle
        variant=""
        className="text-xs border-none text-white font-medium"
      >
        {t("CurrentLenguaje")}
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-1">
        <Dropdown.Item
          as="button"
          className="hover:bg-skin-primary/30 text-xs w-full font-medium"
          onClick={async () => {
            i18n.changeLanguage("es");
            CurentLenguaje[1](1);
          }}
          data-idculture="1"
          data-code="es-mx"
        >
          {t("Esp")}
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          className="hover:bg-skin-primary/30 text-xs w-w-full font-medium"
          onClick={async () => {
            i18n.changeLanguage("en");
            CurentLenguaje[1](2);
          }}
          data-idculture="2"
          data-code="en-us"
        >
          {t("Eng")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
