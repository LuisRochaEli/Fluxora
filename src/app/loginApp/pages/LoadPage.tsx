import { useTranslation } from "react-i18next";
export const LoadPage = () => {
  const [t] = useTranslation("global");
  return (
    <div className="bg-login-img bg-no-repeat bg-cover h-[100vh] grid">
      <div className="bg-black/25  card   mx-10 md:mx-20 lg:mx-80 h-1/2 my-auto grid grid-flow-row">
        <div className="flex my-28">
          <div className="grid my-auto mx-auto justify-items-center text-white">
            <h1 className="text-6xl animate-pulse">{t("Login.Welcome")}</h1>
            <i className="text-9xl  i-login animate-pulse "></i>
            <h1 className="text-xl animate-pulse">{t("Login.LoginSession")}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
