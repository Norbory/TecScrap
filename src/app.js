const app = require('./core.js')

app.listen(port, () => {
    console.log(`Server running on port ${3000}`)
})

app.get('/api/search', async (req, res) => {
    try{
        
        ;(async () => {
            const browser = await chromium.launch()
            const page = await browser.newPage();
            await page.goto("https://busquedas.elperuano.pe/?start=0&tipoDispositivo=&entidad=2071&tipoPublicacion=NL");
            await page.waitForTimeout(2000);
            const contador = await page.getByText('div', ' dispositivos encontrados');
            // Mostrar el string
            console.log(contador.innerText());
            res.status(200).json(resultado);
            await page.close();
            await browser.close();
        })();
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

