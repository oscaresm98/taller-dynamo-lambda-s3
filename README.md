# Taller Dynamo, Lambda S3
Aplicación frontend para el registro y visualizacion de usuarios 

`Nota: Para que la aplicación funcione es necesario crear un buckets en S3 y para la subida de imágenes y tener configurado un api rest (en lambda para este taller) en donde enviar los datos`

## Pasos para servir el proyecto

1. Clonar proyecto

2. Instalar dependencias
```
npm install
```

3. Clonar archivo __.env.template__ y renombrarlo a __.env__

4. Cambiar las variables de entorno

5. Levantar proyecto
```
npm run start:dev
```

### Si hay problemas con los cors

Para esto se esta usando la libreria __local-cors-proxy__ como intermediario para evitar el problema de cors

1. Dejar el valor de __http://localhost:8010/proxy/default__ en __VITE_AWS_API_GATEWAY_URL__ del archivo __.env__

2. Configurar la url del api para el proxy en los scripts del archivo __package.json__

```
"proxy": "lcp --proxyUrl <dirección de la url>",
```
Por ejemplo:
```
"proxy": "lcp --proxyUrl https://w0pbucvgyl.execute-api.us-east-1.amazonaws.com",
```

3. Levantar el proxy
```
npm run proxy
```

## Stack Usado
- React
- TailwindCSS
- TypeScript
- aws-sdk
