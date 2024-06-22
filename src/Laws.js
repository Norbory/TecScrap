import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch(
        // Mira lo que hace el navegador
        {headless: false,
        slowMo: 50}
    )
    const page = await browser.newPage();
    // Open the page
    await page.goto("https://busquedas.elperuano.pe/");
    // Wait for the page to load
    await page.waitForTimeout(1000);
    
    console.log(numero);


    // Close the browser and page
    await page.close();
    await browser.close();
})();