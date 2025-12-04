# Ejemplos de DataDome con Python - CapSolver

Esta carpeta contiene ejemplos de implementación en Python para resolver 
captchas de DataDome usando CapSolver.

## 📁 Estructura de Carpetas

```
python/
├── datadome-slider/                    # DataDome Slider Captcha
│   ├── requirements.txt
│   └── datadome_slider.py
└── README.md
```

## 🚀 Instalación

Cada carpeta tiene su propio `requirements.txt`. Para instalar las dependencias en cada ejemplo:

```bash
cd datadome-slider
pip install -r requirements.txt
```

## 🔧 Configuración

Asegúrate de tener configurada tu API key de CapSolver en el archivo `.env.example` en la raíz del proyecto:

```
CAPSOLVER_API_KEY=tu_api_key_aqui
```

O configura la variable de entorno directamente:

```powershell
$env:CAPSOLVER_API_KEY="tu_api_key_aqui"
```

## 📖 Uso

Para ejecutar cualquier ejemplo:

```bash
cd [nombre-de-carpeta]
python [nombre-del-script].py
```

Por ejemplo:

```bash
cd datadome-slider
python datadome_slider.py
```

## 📋 Ejemplos Disponibles

### 1. DataDome Slider (`datadome-slider/`)
**Archivo:** `datadome_slider.py`
- **captchaUrl**: URL completa del captcha DataDome (geo.captcha-delivery.com)
- **Tipo**: DatadomeSliderTask
- **Proxy**: **Requerido** (estático/sticky)
- **Parámetros**: captchaUrl, proxy, userAgent
- **Retorna**: Cookie `datadome`

## 🔧 Tipos de tareas disponibles

| Tipo de Tarea | Descripción |
|---------------|-------------|
| `DatadomeSliderTask` | DataDome Slider y Interstitial (requiere proxy) |

## 📊 Parámetros comunes

### Para DataDome:
- `captchaUrl` (requerido) - URL completa del captcha (geo.captcha-delivery.com/...)
- `proxy` (requerido) - Formato: `ip:port:user:pass`
- `userAgent` (requerido) - User-Agent de Chrome (debe coincidir con el de tu código)

### User Agents soportados:
```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36
```

## ⚠️ Notas Importantes

- **Proxy requerido**: DataDome siempre requiere proxy propio
- **User Agent**: Debe coincidir exactamente con el que uses en tu código
- **Parámetro t**: En la captchaUrl, `t=fe` es válido, `t=bv` significa IP baneada
- Todos los scripts incluyen manejo de errores completo
- Los mensajes están en español
- Usan polling automático hasta obtener resultado
