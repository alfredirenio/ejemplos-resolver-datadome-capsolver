"""
Resolvedor de DataDome Slider usando la API de CapSolver
Resuelve desafíos de DataDome (Slider e Interstitial) con proxy propio
"""

import capsolver
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv("../../.env.example")

# Parámetros de DataDome
# ⚠️ REEMPLAZAR con los valores de tu sitio objetivo
CAPTCHA_URL = "https://geo.captcha-delivery.com/captcha/?initialCid=EJEMPLO&hash=EJEMPLO&cid=EJEMPLO&t=fe&referer=https%3A%2F%2Fwww.ejemplo.com%2F&s=EJEMPLO&e=EJEMPLO"

# ⚠️ PROXY REQUERIDO - Formato: ip:puerto:usuario:contraseña
# Debe ser proxy estático o sticky (NO rotativo)
PROXY = "ip:port:user:pass"

# User-Agent REQUERIDO (debe coincidir con el de tu código)
# Usa SOLO los User Agents soportados por CapSolver
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36"


def resolver_datadome(captcha_url, proxy, user_agent):
    """
    Resolver DataDome Slider usando la API de CapSolver

    Args:
        captcha_url (str): La URL completa del captcha DataDome
        proxy (str): Proxy en formato ip:port:user:pass
        user_agent (str): User-Agent de Chrome

    Returns:
        dict: Diccionario con la cookie datadome
    """
    print(f"[*] Iniciando resolución de DataDome Slider...")
    print(f"[*] Captcha URL: {captcha_url[:80]}...")
    print(f"[*] Proxy: {proxy.split(':')[0]}:***:***:***")  # Ocultar credenciales
    print(f"[*] User-Agent: {user_agent[:50]}...")

    # Verificar parámetro t en la URL
    if "t=bv" in captcha_url:
        raise ValueError("La captchaUrl contiene 't=bv'. Tu IP está BANEADA. Debes cambiar de IP (debe ser 't=fe')")

    try:
        # Configurar la clave API de CapSolver desde variable de entorno
        capsolver.api_key = os.getenv("CAPSOLVER_API_KEY")

        if not capsolver.api_key:
            raise ValueError("La variable de entorno CAPSOLVER_API_KEY no está configurada")

        if proxy == "ip:port:user:pass":
            raise ValueError("Debes configurar un proxy válido. El proxy es REQUERIDO para DataDome")

        print("[*] Enviando tarea a CapSolver...")

        # Construir payload de la tarea
        tarea_payload = {
            "type": "DatadomeSliderTask",
            "captchaUrl": captcha_url,
            "proxy": proxy,
            "userAgent": user_agent
        }

        # Resolver el DataDome
        solucion = capsolver.solve(tarea_payload)

        print("[+] ¡Captcha resuelto exitosamente!")

        # Extraer la cookie
        cookie = solucion.get("cookie")

        if cookie:
            print(f"[+] Cookie datadome recibida (longitud: {len(cookie)} caracteres)")
            return {
                "cookie": cookie
            }
        else:
            raise Exception("No se encontró cookie en la solución")

    except Exception as e:
        print(f"[-] Error al resolver DataDome: {e}")
        raise


def main():
    """
    Función principal de ejecución
    """
    print("=" * 70)
    print("Resolvedor de DataDome Slider - Integración con CapSolver")
    print("⚠️  Este tipo de tarea REQUIERE proxy estático/sticky")
    print("=" * 70)

    try:
        # Resolver el DataDome
        resultado = resolver_datadome(
            captcha_url=CAPTCHA_URL,
            proxy=PROXY,
            user_agent=USER_AGENT
        )

        print("\n" + "=" * 70)
        print("RESULTADO")
        print("=" * 70)

        if resultado.get("cookie"):
            print(f"\nCookie datadome:\n{resultado['cookie']}\n")

        print("\n[+] ¡Proceso completado exitosamente!")
        print("\n[*] Instrucciones de uso:")
        print("    1. Usa la cookie 'datadome' en tus peticiones")
        print("    2. Usa el mismo User-Agent que configuraste")
        print("    3. Usa el mismo proxy que usaste para resolver")
        print("    4. Ejemplo de uso:")
        print('       headers = {"Cookie": "datadome=VALOR_DE_LA_COOKIE"}')

    except Exception as e:
        print(f"\n[-] El proceso falló: {e}")
        return 1

    return 0


if __name__ == "__main__":
    exit(main())
