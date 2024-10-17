import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import LogoResponsivoSVG from "../../assets/LogoResponsivo.svg";
import { useSideMenuStore } from "../../store";
import { useNavigate } from "react-router-dom";
import LogoSVG from "../../assets/Logo_2.svg";
import { useEffect } from "react";

interface Sidebar {
  ListadoMenu: ISideBarMenu[];
}

export const SideBar = (props: Sidebar) => {
  const { ListadoMenu } = props;
  //#region HOOKS
  const {
    ColapsoMenu,
    AlternarMenuResponsivo,
    setAlternarMenuResponsivo,
    TamañoHorizontalPantalla,
    setTamañoHorizontalPantalla,
  } = useSideMenuStore();
  const NavegarRuta = useNavigate();
  //#endregion HOOKS

  //#region VARIABLES
  //#endregion VARIABLES

  //#region USESTATE
  //#endregion USESTATE

  //#region FUNCIONES
  const SideBarSubMenu = (ItemMenu: ISideBarMenu, index: number) => {
    return (
      <SubMenu key={index} label={ItemMenu.textoMenu} icon={ItemMenu.icono}>
        {ItemMenu.subMenu.map((x: ISideBarMenu, index: number) => {
          if (x?.subMenu?.length <= 0) {
            return (
              <MenuItem
                rootStyles={{
                  ["." + menuClasses.label]: {
                    whiteSpace: "normal",
                    textAlign: "center",
                  },
                }}
                key={index}
                icon={x.icono}
                onClick={() => NavegarRutaItem(x)}
              >
                {x.textoMenu}
              </MenuItem>
            );
          } else {
            return SideBarSubMenu(x, index);
          }
        })}
      </SubMenu>
    );
  };

  const NavegarRutaItem = (x: ISideBarMenu) => {
    if (x?.ruta) {
      NavegarRuta(x.ruta);
    }
  };
  //#endregion FUNCIONES

  //#region USEEFFECT
  useEffect(() => {
    const handleResize = () => {
      setTamañoHorizontalPantalla(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //#endregion USEEFFECT

  return (
    <div className="z-30">
      <div className="flex h-full border-r-[1px] border-skin-primary/20">
        <Sidebar
          backgroundColor={
            TamañoHorizontalPantalla <= 1000
              ? "rgb(249,249,249,0.6)"
              : "rgb(249,249,249)"
          }
          onBackdropClick={() => setAlternarMenuResponsivo(false)}
          customBreakPoint="1000px" //"767px"
          collapsed={ColapsoMenu}
          toggled={AlternarMenuResponsivo}
        >
          {TamañoHorizontalPantalla > 1000 && (
            <>
              <div className="flex items-center justify-start md:justify-center p-3">
                <img src={ColapsoMenu ? LogoResponsivoSVG : LogoSVG} />
              </div>
              <hr className="border-skin-primary h-0.5 mx-3 border-[2px]"></hr>
            </>
          )}
          <Menu>
            {ListadoMenu.map((x: ISideBarMenu, index: number) => {
              if (x?.subMenu?.length <= 0) {
                return (
                  <MenuItem
                    key={index}
                    icon={x.icono}
                    onClick={() => NavegarRutaItem(x)}
                  >
                    {x.textoMenu}
                  </MenuItem>
                );
              } else {
                return SideBarSubMenu(x, index);
              }
            })}
          </Menu>
        </Sidebar>
      </div>
    </div>
  );
};
