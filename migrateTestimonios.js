/**
 * SCRIPT PARA MIGRAR TESTIMONIOS A FIREBASE
 * Versión con escape correcto de caracteres especiales
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const { URL } = require("url");

// ✅ LEER .env.local
function cargarEnv() {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!fs.existsSync(envPath)) {
    console.error("❌ ERROR: No se encontró .env.local en la raíz del proyecto");
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, "utf8");
  const env = {};

  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && key.trim() && !key.startsWith("#")) {
      env[key.trim()] = valueParts.join("=").trim();
    }
  });

  return env;
}

const ENV = cargarEnv();
const API_KEY = ENV.NEXT_PUBLIC_FIREBASE_API_KEY;
const PROJECT_ID = ENV.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

console.log("\n📋 Valores cargados:");
console.log(
  `   API_KEY: ${API_KEY ? "✅ " + API_KEY.substring(0, 10) + "..." : "❌ NO ENCONTRADO"}`
);
console.log(`   PROJECT_ID: ${PROJECT_ID ? "✅ " + PROJECT_ID : "❌ NO ENCONTRADO"}`);

if (!API_KEY || !PROJECT_ID) {
  console.error("\n❌ ERROR: Faltan valores en .env.local");
  process.exit(1);
}

// ✅ DATOS DE TESTIMONIOS (sin caracteres problemáticos)
const testimoniosMock = [
  {
    nombre: "Maria Fernandez",
    rol: "Usuario TIVO · Lima",
    mensaje:
      "Antes mi trayecto era aburrido y solitario. Hoy comparto el viaje con personas increibles y he hecho amigos que perduran.",
    rating: 5,
    foto: "",
    orden: 0,
    active: true,
  },
  {
    nombre: "Carlos Mendoza",
    rol: "Conductor TIVO · Arequipa",
    mensaje:
      "Ser parte de TIVO me permitio conocer nuevas rutas y monetizar mi auto de forma segura. Recomendado 100%.",
    rating: 5,
    foto: "",
    orden: 1,
    active: true,
  },
  {
    nombre: "Ana Silva",
    rol: "Pasajera frecuente · Cusco",
    mensaje:
      "La aplicacion es facil de usar y los conductores son muy profesionales. Me siento segura siempre.",
    rating: 4,
    foto: "",
    orden: 2,
    active: true,
  },
  {
    nombre: "Juan Rodriguez",
    rol: "Emprendedor TIVO · Trujillo",
    mensaje:
      "Supere mis expectativas. No solo es un viaje seguro, sino tambien una oportunidad de negocio.",
    rating: 5,
    foto: "",
    orden: 3,
    active: true,
  },
  {
    nombre: "Rosa Martinez",
    rol: "Estudiante · Lima",
    mensaje:
      "Excelente servicio. Llego a mis clases puntualmente y sin preocupaciones. Muy recomendado.",
    rating: 5,
    foto: "",
    orden: 4,
    active: true,
  },
];

// ✅ FUNCIÓN PARA HACER REQUESTS HTTPS
function hacerRequest(url, metodo, datos) {
  return new Promise((resolve, reject) => {
    const dataString = JSON.stringify(datos);

    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(dataString),
      },
    };

    const req = https.request(options, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch {
            resolve(body);
          }
        } else {
          try {
            const error = JSON.parse(body);
            reject(
              new Error(error.error?.message || `Error HTTP ${res.statusCode}`)
            );
          } catch {
            reject(new Error(`Error HTTP ${res.statusCode}: ${body}`));
          }
        }
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    req.write(dataString);
    req.end();
  });
}

// ✅ FUNCIÓN PARA AGREGAR UN TESTIMONIO
async function agregarTestimonio(testimonio) {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/testimonios?key=${API_KEY}`;

  const documento = {
    fields: {
      nombre: { stringValue: testimonio.nombre },
      rol: { stringValue: testimonio.rol },
      mensaje: { stringValue: testimonio.mensaje },
      rating: { integerValue: String(testimonio.rating) },
      foto: { stringValue: testimonio.foto },
      orden: { integerValue: String(testimonio.orden) },
      active: { booleanValue: testimonio.active },
      createdAt: { timestampValue: new Date().toISOString() },
      updatedAt: { timestampValue: new Date().toISOString() },
    },
  };

  try {
    await hacerRequest(url, "POST", documento);
    return true;
  } catch (error) {
    throw error;
  }
}

// ✅ MIGRACIÓN
async function migrar() {
  console.log("\n🚀 Iniciando migración de testimonios...\n");

  let migrados = 0;
  let errores = 0;

  for (const testimonio of testimoniosMock) {
    try {
      await agregarTestimonio(testimonio);
      migrados++;
      console.log(`✅ [${migrados}/5] "${testimonio.nombre}" migrado`);
      // Pequeño delay para evitar rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      errores++;
      console.error(`❌ Error al migrar "${testimonio.nombre}":`, error.message);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`📊 Resultados:`);
  console.log(`   ✅ Migrados: ${migrados}`);
  console.log(`   ❌ Errores: ${errores}`);
  console.log("=".repeat(50));

  if (migrados === 5) {
    console.log("\n✨ ¡MIGRACIÓN COMPLETADA!\n");
    console.log("🎉 Ahora puedes ver los testimonios en tu app:\n");
    console.log("   📖 Home: Carrusel de testimonios");
    console.log("   📄 /testimonios: Grid con todos los testimonios\n");
  } else if (migrados > 0) {
    console.log(`\n⚠️  Se migraron ${migrados} de 5 testimonios\n`);
  }

  process.exit(errores > 0 ? 1 : 0);
}

// ✅ EJECUTAR
migrar();