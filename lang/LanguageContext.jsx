"use client";

/**
 * ──────────────────────────────────────────────────────────────────────
 *  LanguageContext — Sistema multiidioma de TIVO
 * ──────────────────────────────────────────────────────────────────────
 */

import { createContext, useContext, useState, useEffect } from "react";

// ─── ESPAÑOL ────────────────────────────────────────────────────────
import navbarES               from "./es/navbar";
import footerES               from "./es/footer";
import heroES                 from "./es/hero";
import comoFuncionaES         from "./es/comoFunciona";
import seguridadES            from "./es/seguridad";
import impactoES              from "./es/impacto";
import testimoniosES          from "./es/testimonios";
import uneteATivoES           from "./es/uneteATivo";
import reservasHomeES         from "./es/reservasHome";
import impactoPageES          from "./es/impactoPage";
import seguridadPageES        from "./es/seguridadPage";
import sobreNosotrosES        from "./es/sobreNosotros";
import misionVisionES         from "./es/misionVision";
import nuestrosValoresES      from "./es/nuestrosValores";
import objetivosES            from "./es/objetivos";
import comoFuncionaPageES     from "./es/comoFuncionaPage";
import testimoniosPageES      from "./es/testimoniosPage";
import contactoPageES         from "./es/contactoPage";
import reservasPageES         from "./es/reservasPage";
import terminosES             from "./es/terminos";
import politicaPrivacidadES   from "./es/politicaPrivacidad";
import libroReclamacionesES   from "./es/libroReclamaciones";
import preguntasFrecuentesES  from "./es/preguntasFrecuentes";
import uneteModalES           from "./es/uneteModal";

// ─── INGLÉS ─────────────────────────────────────────────────────────
import navbarEN               from "./en/navbar";
import footerEN               from "./en/footer";
import heroEN                 from "./en/hero";
import comoFuncionaEN         from "./en/comoFunciona";
import seguridadEN            from "./en/seguridad";
import impactoEN              from "./en/impacto";
import testimoniosEN          from "./en/testimonios";
import uneteATivoEN           from "./en/uneteATivo";
import reservasHomeEN         from "./en/reservasHome";
import impactoPageEN          from "./en/impactoPage";
import seguridadPageEN        from "./en/seguridadPage";
import sobreNosotrosEN        from "./en/sobreNosotros";
import misionVisionEN         from "./en/misionVision";
import nuestrosValoresEN      from "./en/nuestrosValores";
import objetivosEN            from "./en/objetivos";
import comoFuncionaPageEN     from "./en/comoFuncionaPage";
import testimoniosPageEN      from "./en/testimoniosPage";
import contactoPageEN         from "./en/contactoPage";
import reservasPageEN         from "./en/reservasPage";
import terminosEN             from "./en/terminos";
import politicaPrivacidadEN   from "./en/politicaPrivacidad";
import libroReclamacionesEN   from "./en/libroReclamaciones";
import preguntasFrecuentesEN  from "./en/preguntasFrecuentes";
import uneteModalEN           from "./en/uneteModal";

// ─── Construir objeto global de traducciones ───────────────────────
const traducciones = {
  es: {
    navbar:               navbarES,
    footer:               footerES,
    hero:                 heroES,
    comoFunciona:         comoFuncionaES,
    seguridad:            seguridadES,
    impacto:              impactoES,
    testimonios:          testimoniosES,
    uneteATivo:           uneteATivoES,
    reservasHome:         reservasHomeES,
    impactoPage:          impactoPageES,
    seguridadPage:        seguridadPageES,
    sobreNosotros:        sobreNosotrosES,
    misionVision:         misionVisionES,
    nuestrosValores:      nuestrosValoresES,
    objetivos:            objetivosES,
    comoFuncionaPage:     comoFuncionaPageES,
    testimoniosPage:      testimoniosPageES,
    contactoPage:         contactoPageES,
    reservasPage:         reservasPageES,
    terminos:             terminosES,
    politicaPrivacidad:   politicaPrivacidadES,
    libroReclamaciones:   libroReclamacionesES,
    preguntasFrecuentes:  preguntasFrecuentesES,
    uneteModal:           uneteModalES,
  },
  en: {
    navbar:               navbarEN,
    footer:               footerEN,
    hero:                 heroEN,
    comoFunciona:         comoFuncionaEN,
    seguridad:            seguridadEN,
    impacto:              impactoEN,
    testimonios:          testimoniosEN,
    uneteATivo:           uneteATivoEN,
    reservasHome:         reservasHomeEN,
    impactoPage:          impactoPageEN,
    seguridadPage:        seguridadPageEN,
    sobreNosotros:        sobreNosotrosEN,
    misionVision:         misionVisionEN,
    nuestrosValores:      nuestrosValoresEN,
    objetivos:            objetivosEN,
    comoFuncionaPage:     comoFuncionaPageEN,
    testimoniosPage:      testimoniosPageEN,
    contactoPage:         contactoPageEN,
    reservasPage:         reservasPageEN,
    terminos:             terminosEN,
    politicaPrivacidad:   politicaPrivacidadEN,
    libroReclamaciones:   libroReclamacionesEN,
    preguntasFrecuentes:  preguntasFrecuentesEN,
    uneteModal:           uneteModalEN,
  },
};

// ─── Idiomas disponibles ────────────────────────────────────────────
export const IDIOMAS_DISPONIBLES = [
  { code: "es", nombre: "Español", flag: "🇪🇸" },
  { code: "en", nombre: "English", flag: "🇬🇧" },
];

const IDIOMA_DEFAULT = "es";
const STORAGE_KEY = "tivo_lang";

const LanguageContext = createContext({
  lang: IDIOMA_DEFAULT,
  setLang: () => {},
  t: traducciones[IDIOMA_DEFAULT],
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(IDIOMA_DEFAULT);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);

      if (guardado && traducciones[guardado]) {
        setLangState(guardado);
      } else {
        const navegador = navigator.language?.toLowerCase().slice(0, 2);
        if (navegador === "en") {
          setLangState("en");
        }
      }
    } catch (e) {
      // localStorage puede fallar en modo privado
    } finally {
      setHidratado(true);
    }
  }, []);

  const setLang = (nuevoLang) => {
    if (!traducciones[nuevoLang]) return;
    setLangState(nuevoLang);
    try {
      localStorage.setItem(STORAGE_KEY, nuevoLang);
    } catch (e) {
      // ignorar
    }
  };

  const value = {
    lang,
    setLang,
    t: traducciones[lang],
    hidratado,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  }
  return ctx;
}