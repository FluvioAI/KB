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
    const { knowledge_base_name, texts = [], urls = [], files = [], enable_auto_refresh = true } = req.body;

    const knowledgeBaseData = {
      knowledge_base_name,
      enable_auto_refresh
    };

    if (texts.length > 0) {
      knowledgeBaseData.knowledge_base_texts = texts;
    }

    if (urls.length > 0) {
      knowledgeBaseData.knowledge_base_urls = urls;
    }

    if (files.length > 0) {
      knowledgeBaseData.knowledge_base_files = files;
    }

    const response = await client.knowledgeBase.create(knowledgeBaseData);

    res.status(200).json({
      success: true,
      data: response,
      knowledge_base_id: response.knowledge_base_id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}