const app = require('./index.js')
const { port } = require('./config')
const { chromium } = require('playwright');

app.listen(port,() => {
    console.log(`Server running on port ${port || 3000}`)
})

app.get('/api/search', async (req, res) => {
    try{
        ;(async () => {
            const browser = await chromium.launch({
                headless: true,
            })
            const page = await browser.newPage();
            await page.goto("https://busquedas.elperuano.pe/?start=0&fechaIni=20240620&tipoDispositivo=&entidad=2071&tipoPublicacion=NL");
            await page.waitForTimeout(2000);
            const contador = await page.locator('main .mt-4');
            // Mostrar el string
            if (contador === null) {
                res.status(404).json({message: "No se encontraron resultados"});
                await page.close();
                await browser.close();
            }
            console.log(contador.innerText());
            res.status(200).json({message: contador.nth(0).innerText()});
            await page.close();
            await browser.close();
        })();
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

