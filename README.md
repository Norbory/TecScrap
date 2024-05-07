# Amazon Tech Product Scraper

Este proyecto es un web scraper diseñado para buscar productos tecnológicos en Amazon. Utiliza técnicas de scraping para recopilar información sobre los productos y generar informes detallados.

<img align="center" alt="Json response" src="https://res.cloudinary.com/dmbtlv0hg/image/upload/v1715122436/samples/people/prueba_n6kwk2.png">

## Funcionalidades

- **Búsqueda de Productos**: El scraper puede buscar productos tecnológicos en Amazon utilizando diferentes criterios de búsqueda, como palabras clave, categorías o marcas específicas.
  
- **Recopilación de Datos**: Extrae información detallada sobre los productos, incluyendo el nombre, el precio, la descripción, las valoraciones de los clientes y más.

## Próximos Pasos

- **Creación de API**: Para poder utilizar de manera pública, se necesitará implementar la creación de un API para la gestión de peticiones.

- **Deploy en Azure**: Para el deploy y uso automatizado de ciertos productos, se necesitará su deploy con el uso de Azure Functions.

- **OAuth verificación**: Para su uso se debe de implementar la necesidad de la creación de un token.

- **Generación de Informes**: Genera informes en formato CSV o Excel que contienen los datos recopilados sobre los productos encontrados en Amazon.

## Uso

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/Norbory/TecScrap.git

2. Instala las dependencias del proyecto:

    ```bash
    npm i

3. Ejecuta el scraper proporcionando los criterios de búsqueda deseados:

    ```bash
    npm start

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún error o tienes alguna mejora, no dudes en abrir un issue o enviar un pull request.

## Aviso Legal

Este proyecto se proporciona con fines educativos y de aprendizaje. El scraping de sitios web puede estar sujeto a términos de servicio y políticas de uso aceptable. Asegúrate de revisar y cumplir con las políticas de uso de Amazon antes de utilizar este scraper en producción.
