import { useLogInStore } from "../../store/logIn/useLogInStore";
import { useTitulo } from "../../hooks/template/useTitulo";
import { DropdownLenguaje } from "./DropdownLenguaje";
import { useAuthStore, useSideMenuStore, useSpinLoadStore } from "../../store";
import LogoSVG from "../../assets/Logo_2.svg";
import { HiMenuAlt1 } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { TOKEN_KEY } from "../../Constants";
import { TbLogout } from "react-icons/tb";

export const NavBar = () => {
  //#region HOOKS
  const {
    ColapsoMenu,
    setColapsoMenu,
    AlternarMenuResponsivo,
    setAlternarMenuResponsivo,
    TamañoHorizontalPantalla,
  } = useSideMenuStore();
  const { NombreTitulo } = useTitulo();
  const { Usuario } = useLogInStore();
  const { MostrarCarga, OcultarCargar } = useSpinLoadStore();
  const { onLogout } = useAuthStore();
  //#endregion HOOKS

  //#region VARIABLES
  //#endregion VARIABLES

  //#region USESTATE
  //#endregion USESTATE

  //#region FUNCIONES
  const LogOut = () => {
    MostrarCarga();
    localStorage.removeItem(TOKEN_KEY);
    onLogout();
    OcultarCargar();
  };
  //#endregion FUNCIONES

  //#region USEEFFECT
  //#endregion USEEFFECT

  return (
    <>
      <header className="bg-white flex z-40">
        {TamañoHorizontalPantalla <= 1000 && (
          <div className="pl-3 flex items-center justify-start md:justify-center w-60 h-[5vh]">
            <img src={LogoSVG} className="w-28 md:w-3/4" />
            <div className="flex justify-start items-center">
              <HiMenuAlt1
                className="text-center p-1 text-skin-primary d-sm-block d-2xl-none cursor-pointer"
                size={30}
                onClick={() => {
                  setAlternarMenuResponsivo(!AlternarMenuResponsivo);
                  setColapsoMenu(false);
                }}
              />
            </div>
          </div>
        )}
        <div className="flex justify-between w-full mr-4 h-[5vh]">
          <div className="flex items-center ml-6">
            {TamañoHorizontalPantalla >= 1000 && (
              <div className="flex justify-start items-center">
                <HiMenuAlt1
                  className="transition-all duration-300 ease-in-out text-center p-1 text-skin-primary d-none d-md-block cursor-pointer absolute z-50 -translate-x-[39px] translate-y-3 border-2 rounded-full border-skin-primary hover:bg-skin-primary hover:text-white"
                  size={30}
                  onClick={() => setColapsoMenu(!ColapsoMenu)}
                />
              </div>
            )}
            <h2 className="hidden d-lg-block d-md-block md:text-2xl text-skin-primary/80 font-bold">
              {NombreTitulo}
            </h2>
          </div>
          <div className="flex items-center lg:justify-between gap-x-4">
            <span className="flex gap-2 items-center justify-end text-skin-primary font-semibold">
              <FaUserTie className="text-skin-primary/60" />
              <div className="grid grid-flow-row text-skin-primary/80">
                {Usuario && (
                  <span className="text-xs font-semibold italic">
                    {`${Usuario.nombres} ${Usuario.paterno}`}
                  </span>
                )}
              </div>
            </span>
            <div>
              <DropdownLenguaje></DropdownLenguaje>
            </div>
            <div>
              <TbLogout
                className="text-skin-primary/60 text-2xl hover:text-skin-primary hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={LogOut}
              ></TbLogout>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
