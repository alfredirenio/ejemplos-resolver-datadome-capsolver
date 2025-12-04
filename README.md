# Ejemplos de DataDome - CapSolver

Esta carpeta contiene ejemplos de implementación para resolver captchas de DataDome usando CapSolver en múltiples lenguajes de programación.

## 📁 Estructura de Carpetas

```
DataDome/
├── .env.example                        # Configuración de API key
├── python/                             # Ejemplos en Python
│   ├── README.md
│   └── datadome-slider/
│       ├── requirements.txt
│       └── datadome_slider.py
├── nodejs/                             # Ejemplos en Node.js
│   ├── README.md
│   └── datadome-slider/
│       ├── package.json
│       └── datadome_slider.js
└── README.md                           # Este archivo
```

## 🔧 Configuración

1. Copia el archivo `.env.example` y configura tu API key:

```
CAPSOLVER_API_KEY=tu_api_key_aqui
```

2. O configura la variable de entorno directamente:

```powershell
$env:CAPSOLVER_API_KEY="tu_api_key_aqui"
```

## 📖 Documentación

- [Documentación Python](./python/README.md)
- [Documentación Node.js](./nodejs/README.md)

## 🔧 Tipos de tareas disponibles

| Tipo de Tarea | Descripción |
|---------------|-------------|
| `DatadomeSliderTask` | DataDome Slider y Interstitial (requiere proxy) |

## 📊 Parámetros requeridos

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `captchaUrl` | String | URL completa del captcha (geo.captcha-delivery.com/...) |
| `proxy` | String | Formato: `ip:port:user:pass` |
| `userAgent` | String | User-Agent de Chrome (debe coincidir con el de tu código) |

## ⚠️ Notas Importantes

- **Proxy requerido**: DataDome siempre requiere proxy propio (estático/sticky)
- **User Agent**: Debe coincidir exactamente con el que uses en tu código
- **Parámetro t**: En la captchaUrl, `t=fe` es válido, `t=bv` significa IP baneada

## 🔗 Enlaces Útiles

- [Documentación CapSolver - DataDome](https://docs.capsolver.com/en/guide/captcha/datadome/)
- [Dashboard CapSolver](https://dashboard.capsolver.com/)

