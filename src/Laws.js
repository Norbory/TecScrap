const { chromium } = require ('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 50,
    })
    const page = await browser.newPage();
    await page.goto("https://busquedas.elperuano.pe/?start=0&fechaIni=20240620&tipoDispositivo=&entidad=2071&tipoPublicacion=NL");
    await page.waitForTimeout(2000);
    const contador = await page.locator('main .mt-4');
    console.log(contador.innerText());


    // Close the browser and page
    await page.close();
    await browser.close();
})();