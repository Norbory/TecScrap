import { chromium } from 'playwright';

// Clase Proveedor
const Proveedores = [{
    nombre: 'Amazon',
    buscar: async ({browser, url, producto}) => {
        // Open the page
        const page = await browser.newPage();
        await page.goto(url);

        // Fill the search input
        const input = await page.locator('#twotabsearchtextbox');
        await input.fill(producto);

        // Click the search button
        const button = await page.locator('#nav-search-submit-button');
        await button.click();

        // Wait for 2 seconds
        await page.waitForTimeout(2000);

        // Put on a list the products
        const elementos = await page.locator('.s-wide-grid-style .puis-v3ov1x6kyurxt12bgrgmhh8kkbv.puis .puisg-col-8-of-16');
        // The list of products names
        const titulos = await elementos.locator('.puis-padding-right-small');
        const numero = await titulos.count();
        // The list of products prices
        // const precios = await elementos.locator('.a-price');
        // console.log(await precios.count());
        
        // Obtain the list of products
        const productsList = [];
        // Iterate over the products titles
        for (let i = 0; i < numero; i++) {
            const titulo = await titulos.locator('h2').nth(i);
            const nombre = await titulo.innerText();
            productsList.push(nombre);
        }
        return productsList;
    }
}];

// Function to launch the browser and open the page
(async () => {
    // Launch the browser
    const browser = await chromium.launch(
        // Descomentar para ver la ejecución del navegador y eliminar el capcha
        // {
        // headless: false,
        // slowMo: 50
        // }
    );
    
    // Search the product in all the providers
    const productos = await Promise.all(
        Proveedores.map(proveedor => 
            proveedor.buscar({
                browser,
                url:'https://www.amazon.com/-/es/',
                producto:'ram 32gb ddr5'
            }
        ))
    );

    // Show the products
    console.log("Mis alternativas de AMAZON son las siguientes: ");
    productos.forEach((producto, index) => {
        console.log(`Proveedor: ${Proveedores[index].nombre}`);
        producto.forEach((nombre, index) => {
            console.log(`Producto ${index + 1}: ${nombre}`);
        });
    });

    // Close the browser
    await browser.close();
})();