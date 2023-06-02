Se divide en dos carpetas, “client” equivalente al frontend y “server” equivalente al backend. Para ejecutar correctamente la aplicación ambas se deben de ejecutar por separado paralelamente. 

Antes de su ejecución es necesaria la instalación de ciertos paquetes para el correcto funcionamiento de ambas dos entidades:
Frontend (carpeta ‘client’):
    npm i react
    npm i axios
    npm install @emailjs/browser --save
    npm i dayjs
    npm install @mui/material @emotion/react @emotion/styled
    npm install @mui/icons-material

Backend (carpeta ‘server’):
    npm i express
    npm i mongoose
    npm i cors
    npm i xlsx

Una vez instalados los paquetes, se deben abrir dos terminales paralelamente,  posicionar cada una en cada carpeta entidad, y ejecutar tanto el servidor como el cliente con npm start. 
Si todo se ha instalado correctamente el servidor se ejecutará en el puerto 3000, el cliente en el 5000 y la aplicación web funcionará correctamente.

Algunas credenciales para probar la aplicación:
    (Administrador) usuario: adminLuisa | contraseña: carrocera
    (Usuario empadronado) usuario: agm | contraseña: ayt
