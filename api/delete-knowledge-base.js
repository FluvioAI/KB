import Retell from 'retell-sdk';

const client = new Retell({ apiKey: process.env.RETELL_API_KEY });

export default async function handler(req, res) {
  // Authentication check
  const API_KEY = process.env.MAKE_COM_API_KEY;
  const providedKey = req.headers['x-api-key'];

  if (!providedKey || providedKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { knowledge_base_id } = req.body;

    if (!knowledge_base_id) {
      return res.status(400).json({
        success: false,
        error: 'knowledge_base_id is required'
      });
    }

    await client.knowledgeBase.delete(knowledge_base_id);

    res.status(200).json({
      success: true,
      message: `Knowledge base ${knowledge_base_id} deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}