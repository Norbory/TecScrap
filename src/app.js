const app = require('./index.js')
const { port } = require('./config')

app.listen(port,() => {
    console.log(`Server running on port ${port || 3000}`)
})

let start = 0;
let hits = [];

const fetchingData = async ({fechaIni,institucion}) => {
    const day = new Date().toLocaleDateString();
    const formatDay = day.slice(5,9) + 0 + day.slice(3,4) + day.slice(0,2);
    
    const res = await fetch('https://busquedas.elperuano.pe/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "query": "query Generic($fechaIni: String, $fechaFin: String, $institucion: String, $op: String, $paginatedBy: Int, $query: String, $start: Int, $tipoDispositivo: String, $tipoPublicacion: String, $ci: String) {\n  results: getGenericPublication(\n    fechaIni: $fechaIni\n    fechaFin: $fechaFin\n    institucion: $institucion\n    op: $op\n    paginatedBy: $paginatedBy\n    query: $query\n    start: $start\n    tipoDispositivo: $tipoDispositivo\n    tipoPublicacion: $tipoPublicacion\n    ci: $ci\n  ) {\n    totalHits\n    start\n    hasNext\n    paginatedBy\n    hits {\n      clasificacion1\n      clasificacion2\n      fechaPublicacion\n      nombreDispositivo\n      op\n      paginas\n      rubro\n      sector\n      sumilla\n      tipoDispositivo\n      tipoPublicacion\n      urlPDF\n      urlPortada\n      __typename\n    }\n    __typename\n  }\n}",
          "variables":{
              "fechaFin": formatDay,
              "fechaIni": fechaIni ?? formatDay,
              "institucion": institucion ?? "",
              "start":0,
              "tipoDispositivo": "",
              "tipoPublicacion": "NL"
          },
        },
    )});
    const data = await res.json();
    hits.push(...data.data.results.hits);

    // if (data.data.results.hasNext) {
    //     start += 20;
    //     console.log(start);
    //     fetchingData({fechaIni,institucion})
    // }

    let totalHits = data.data.results.totalHits;
    const results = {totalHits, hits};
    return results;
};

app.get('/api/search', async (req, res) => {
    try{
        const results = await fetchingData({});
        return res.json(results);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

app.post('/api/search', async (req, res) => {
    try{
        const {fechaIni,institucion} = req.body;
        const results = await fetchingData({fechaIni,institucion});
        return res.json(results);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

