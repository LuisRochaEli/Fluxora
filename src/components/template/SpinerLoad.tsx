import { Spinner } from "react-bootstrap";
import { useSpinLoadStore } from "../../store/template/useSpinLoadStore";

export const SpinerLoad = () => {
  const { CargaGiratoria } = useSpinLoadStore();
  return (
    <>
      {CargaGiratoria ? (
        <div id="SpinerLoad" className="SpinLoadPadre  ">
          <div className="SpinLoadhijo">
            <Spinner
              className="SpinLoad-centered"
              style={{ width: "12rem", height: "12rem" }}
              animation="grow"
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
