/**
 * Resolvedor de DataDome Slider usando la API de CapSolver
 * Resuelve desafíos de DataDome (Slider e Interstitial) con proxy propio
 */

const Capsolver = require("capsolver-npm");
require("dotenv").config({ path: "../../.env.example" });

// Parámetros de DataDome
// ⚠️ REEMPLAZAR con los valores de tu sitio objetivo
const CAPTCHA_URL = "https://geo.captcha-delivery.com/captcha/?initialCid=EJEMPLO&hash=EJEMPLO&cid=EJEMPLO&t=fe&referer=https%3A%2F%2Fwww.ejemplo.com%2F&s=EJEMPLO&e=EJEMPLO";

// ⚠️ PROXY REQUERIDO - Formato: ip:puerto:usuario:contraseña
// Debe ser proxy estático o sticky (NO rotativo)
const PROXY = "ip:port:user:pass";

// User-Agent REQUERIDO (debe coincidir con el de tu código)
// Usa SOLO los User Agents soportados por CapSolver
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36";


/**
 * Resolver DataDome Slider usando la API de CapSolver
 * @param {string} captchaUrl - La URL completa del captcha DataDome
 * @param {string} proxy - Proxy en formato ip:port:user:pass
 * @param {string} userAgent - User-Agent de Chrome
 * @returns {Promise<Object>} - Diccionario con la cookie datadome
 */
async function resolverDatadome(captchaUrl, proxy, userAgent) {
    console.log("[*] Iniciando resolución de DataDome Slider...");
    console.log(`[*] Captcha URL: ${captchaUrl.substring(0, 80)}...`);
    console.log(`[*] Proxy: ${proxy.split(":")[0]}:***:***:***`);
    console.log(`[*] User-Agent: ${userAgent.substring(0, 50)}...`);

    // Verificar parámetro t en la URL
    if (captchaUrl.includes("t=bv")) {
        throw new Error("La captchaUrl contiene 't=bv'. Tu IP está BANEADA. Debes cambiar de IP (debe ser 't=fe')");
    }

    // Configurar la clave API de CapSolver desde variable de entorno
    const apiKey = process.env.CAPSOLVER_API_KEY;

    if (!apiKey) {
        throw new Error("La variable de entorno CAPSOLVER_API_KEY no está configurada");
    }

    if (proxy === "ip:port:user:pass") {
        throw new Error("Debes configurar un proxy válido. El proxy es REQUERIDO para DataDome");
    }

    console.log("[*] Enviando tarea a CapSolver...");

    // Crear instancia del solver
    const solver = new Capsolver(apiKey);

    try {
        // Resolver el DataDome
        const solucion = await solver.solve({
            type: "DatadomeSliderTask",
            captchaUrl: captchaUrl,
            proxy: proxy,
            userAgent: userAgent
        });

        console.log("[+] ¡Captcha resuelto exitosamente!");

        // Extraer la cookie
        const cookie = solucion.cookie;

        if (cookie) {
            console.log(`[+] Cookie datadome recibida (longitud: ${cookie.length} caracteres)`);
            return {
                cookie: cookie
            };
        } else {
            throw new Error("No se encontró cookie en la solución");
        }

    } catch (error) {
        console.log(`[-] Error al resolver DataDome: ${error.message}`);
        throw error;
    }
}


/**
 * Función principal de ejecución
 */
async function main() {
    console.log("=".repeat(70));
    console.log("Resolvedor de DataDome Slider - Integración con CapSolver");
    console.log("⚠️  Este tipo de tarea REQUIERE proxy estático/sticky");
    console.log("=".repeat(70));

    try {
        // Resolver el DataDome
        const resultado = await resolverDatadome(
            CAPTCHA_URL,
            PROXY,
            USER_AGENT
        );

        console.log("\n" + "=".repeat(70));
        console.log("RESULTADO");
        console.log("=".repeat(70));

        if (resultado.cookie) {
            console.log(`\nCookie datadome:\n${resultado.cookie}\n`);
        }

        console.log("\n[+] ¡Proceso completado exitosamente!");
        console.log("\n[*] Instrucciones de uso:");
        console.log("    1. Usa la cookie 'datadome' en tus peticiones");
        console.log("    2. Usa el mismo User-Agent que configuraste");
        console.log("    3. Usa el mismo proxy que usaste para resolver");
        console.log("    4. Ejemplo de uso:");
        console.log('       headers: { "Cookie": "datadome=VALOR_DE_LA_COOKIE" }');

        return 0;

    } catch (error) {
        console.log(`\n[-] El proceso falló: ${error.message}`);
        return 1;
    }
}


// Ejecutar
main().then(code => process.exit(code));
