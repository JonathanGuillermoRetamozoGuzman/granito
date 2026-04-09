module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { nombre, telefono, producto, cantidad, notas } = req.body;

  const r = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Pedidos`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          'Nombre cliente': nombre,
          'Teléfono': telefono,
          'Producto': producto,
          'Cantidad': cantidad || 1,
          'Notas': notas || '',
          'Estado': 'Pendiente',
          'Fecha': new Date().toISOString()
        }
      })
    }
  );

  const data = await r.json();
  if (!r.ok) return res.status(500).json({ error: data });
  res.json({ ok: true, id: data.id });
};