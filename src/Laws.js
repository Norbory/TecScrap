const app = require('./index.js');
const { port } = require('./config');
const { json } = require('express');

app.listen(port,() => {
    console.log(`Server running on port ${port || 3000}`)
});

app.get('/api/search', async (req, res) => {
    try{
        const day = new Date().toLocaleDateString();
        const formatDay = day.slice(5,9) + 0 + day.slice(3,4) + day.slice(0,2);
        console.log(formatDay);
        return json(formatDay);
        
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
})

const fetchData = async ({formatDay}) => {
    ;(async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto(`https://busquedas.elperuano.pe/?start=0&fechaIni=${formatDay}&fechaFin=${formatDay}&tipoDispositivo=&entidad=2071&tipoPublicacion=NL`);
        await page.waitForTimeout(2000);
    
        let totalHits = "";
        // Encontrar el contador de resultados
        const contador = await page.locator('main .mt-4');
        await page.waitForTimeout(2000);
        totalHits = await contador.innerText();
        // Poner los resultados en un array de cards
        const cards = await page.locator('main .card');
    
        let infoLaws = [];
        let titulo = "";
        let subtitulosLaws;
        let link = "";
        let descripcion = "";
        let fecha = "";
    
        const cuentaCartas = await cards.count();
    
        for (let i = 0; i < cuentaCartas; i++) {
            const container = await cards.nth(i).locator('.card-body');
    
            for (let k = 0; k < await container.count(); k++) {
                switch (k) {
                    case 0:
                        titulo = await container.nth(k).locator('.card-title').innerText();                    
                        const subtitulos = await container.nth(k).locator('.card-sub-title');
                        let subs = [];
                        for (let j = 0; j < await subtitulos.count(); j++) {
                            const subtitulo = await subtitulos.nth(j).innerText();
                            subs.push(subtitulo);
                        }
                        subtitulosLaws = subs;
                        break;
                    case 1:
                        link = "https://busquedas.elperuano.pe" + await container.nth(k).locator('a').getAttribute('href');
                        descripcion = await container.nth(k).locator('a').innerText();
                        break;
                }
            }
            fecha = await cards.nth(i).locator('.card-footer .float-end').nth(1).innerText();
            infoLaws.push({
                titulo,
                subtitulosLaws, 
                link, 
                descripcion, 
                fecha
            });
        }
        await page.close();
        await browser.close();
    })();
    return {totalHits,infoLaws};
}

// ;(async () => {
//     const browser = await chromium.launch();
//     const page = await browser.newPage();
//     await page.goto("https://busquedas.elperuano.pe/?start=0&fechaIni=20240625&fechaFin=20240625&tipoDispositivo=&entidad=2071&tipoPublicacion=NL");
//     await page.waitForTimeout(2000);

//     let totalHits = "";
//     // Encontrar el contador de resultados
//     const contador = await page.locator('main .mt-4');
//     await page.waitForTimeout(2000);
//     totalHits = await contador.innerText();
//     // Poner los resultados en un array de cards
//     const cards = await page.locator('main .card');

//     let infoLaws = [];
//     let titulo = "";
//     let subtitulosLaws;
//     let link = "";
//     let descripcion = "";
//     let fecha = "";

//     const cuentaCartas = await cards.count();

//     for (let i = 0; i < cuentaCartas; i++) {
//         const container = await cards.nth(i).locator('.card-body');

//         for (let k = 0; k < await container.count(); k++) {
//             switch (k) {
//                 case 0:
//                     titulo = await container.nth(k).locator('.card-title').innerText();                    
//                     const subtitulos = await container.nth(k).locator('.card-sub-title');
//                     let subs = [];
//                     for (let j = 0; j < await subtitulos.count(); j++) {
//                         const subtitulo = await subtitulos.nth(j).innerText();
//                         subs.push(subtitulo);
//                     }
//                     subtitulosLaws = subs;
//                     break;
//                 case 1:
//                     link = "https://busquedas.elperuano.pe" + await container.nth(k).locator('a').getAttribute('href');
//                     descripcion = await container.nth(k).locator('a').innerText();
//                     break;
//             }
//         }
//         fecha = await cards.nth(i).locator('.card-footer .float-end').nth(1).innerText();
//         infoLaws.push({
//             titulo,
//             subtitulosLaws, 
//             link, 
//             descripcion, 
//             fecha
//         });
//     }

//     await page.close();
//     await browser.close();
// })();