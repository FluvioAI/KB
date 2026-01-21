export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'API is working locally!',
      timestamp: new Date().toISOString(),
      method: req.method,
      available_endpoints: [
        '/api/create-knowledge-base',
        '/api/add-sources', 
        '/api/delete-knowledge-base',
        '/api/delete-source',
        '/api/test'
      ]
    });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
