export const useSoundexTexto = () => {
  const TextoFoneticaSimilar = (
    TextoPrincipal: string,
    TextoSecundario: string,
    Porcentaje: number
  ) => {
    TextoPrincipal = TextoPrincipal.replace("SA DE", "").trim()
    const SimilitudPorcentaje = SoundexSimilitudes(
      TextoPrincipal,
      TextoSecundario
    );
    return SimilitudPorcentaje >= Porcentaje;
  };

  const SoundexSimilitudes = (
    TextoPrincipal: string,
    TextoSecundario: string
  ) => {
    // const PalabrasPrincipal = TextoPrincipal.split(/\s+/).map((p) =>
    //   Soundex(p)
    // );
    const PalabrasPrincipal = TextoPrincipal.split(/\s+/).map(p => Soundex(p)).join('');
    const PalabrasSecundario = TextoSecundario.split(/\s+/).map(p => Soundex(p)).join('');
    // const PalabrasSecundario = TextoSecundario.split(/\s+/).map((p) =>
    //   Soundex(p)
    // );
    const setPrincipal = new Set(PalabrasPrincipal);
    const setSecundario = new Set(PalabrasSecundario);
    const Interseccion = new Set(
      [...setPrincipal].filter((code) => setSecundario.has(code))
    );
    const Union = new Set([...setPrincipal, ...setSecundario]);
    const SimilitudPorcentaje = Interseccion.size / Union.size;
    return SimilitudPorcentaje;
  };

  const Soundex = (Palabra: string) => {
    const map: { [key: string]: string } = {
      b: "1",
      f: "1",
      p: "1",
      v: "1",
      c: "2",
      g: "2",
      j: "2",
      k: "2",
      q: "2",
      s: "2",
      x: "2",
      z: "2",
      d: "3",
      t: "3",
      l: "4",
      m: "5",
      n: "5",
      r: "6",
    };
    Palabra = Palabra.toLowerCase();
    let Resultado = Palabra[0]; // Primer carácter
    let UltimoCodigo = map[Palabra[0]] || "";
    for (let i = 1; i < Palabra.length; i++) {
      const char = Palabra[i];
      const Codigo = map[char];
      if (Codigo && Codigo !== UltimoCodigo) {
        Resultado += Codigo;
        UltimoCodigo = Codigo;
      }
    }
    // Rellena el código Soundex con ceros para asegurar que tenga 4 caracteres
    Resultado = Resultado.padEnd(4, "0");
    return Resultado.substring(0, 4);
  };
  return { TextoFoneticaSimilar };
};
