module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Carta`
    + `?filterByFormula={Disponible}=1`
    + `&sort[0][field]=Orden&sort[0][direction]=asc`;

  const r = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}` }
  });
  const data = await r.json();
  res.json(data.records.map(rec => rec.fields));
};