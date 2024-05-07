import { chromium } from 'playwright';

// Clase Proveedor
const Proveedores = [{
    nombre: 'Amazon',
    buscar: async ({page, url, producto}) => {
        // Open the page
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
            const link = await titulos.locator('h2 a').nth(i).getAttribute('href');
            const nombre = await titulo.innerText();
            await page.goto("https://www.amazon.com" + link);
            await page.waitForTimeout(1000);
            const precio = await page.evaluate(() => {
                const element = document.querySelector('.a-price[data-a-size=xl]');
                if (!element) {
                    return "No disponible";
                }
                const dinero = element.innerText;
                const elementos = dinero.split('.');
                return elementos[0];
            });
            await page.goBack();
            productsList.push({Nombre_Producto: nombre, link: `https://www.amazon.com${link}` , precio: precio});
        }
        return productsList;
    }
}];

// Function to launch the browser and open the page
(async () => {
    // Launch the browser
    const browser = await chromium.launch(
        // Graba un video de la prueba
        // {
        //     recordVideo: {
        //         dir: '../pruebas'
        //     }
        // }
        // Mira lo que hace el navegador
        //  headless: false,
        //  slowMo: 50
    );
    const page = await browser.newPage();
    // Search the product in all the providers
    const productos = await Promise.all(
        Proveedores.map(proveedor => 
            proveedor.buscar({
                page,
                url:'https://www.amazon.com/-/es/',
                producto:'ram 32gb ddr5'
            }
        ))
    );

    // Print the products
    console.log(productos);

    // Close the browser and page
    await page.close();
    await browser.close();
})();