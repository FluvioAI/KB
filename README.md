# Retell AI Knowledge Base - Vercel Serverless Functions

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
In Vercel dashboard, add these environment variables:
- `RETELL_API_KEY`: Your Retell AI API key
- `MAKE_COM_API_KEY`: Secret API key for authentication

### 3. Deploy to Vercel
```bash
vercel --prod
```

### 4. make.com Integration

#### Authentication
Add this header to all make.com HTTP requests:
- **Header Name**: `X-API-Key`
- **Header Value**: Your `MAKE_COM_API_KEY` value

#### Create Knowledge Base
- **URL**: `https://your-project.vercel.app/api/create-knowledge-base`
- **Method**: POST
- **Headers**: 
  - `Content-Type: application/json`
  - `X-API-Key: your_secret_key`
- **Body**: JSON
```json
{
  "knowledge_base_name": "My KB",
  "texts": [{"title": "FAQ", "text": "Content"}],
  "urls": ["https://example.com"],
  "files": ["base64_file_content"]
}
```

#### Delete Knowledge Base
- **URL**: `https://your-project.vercel.app/api/delete-knowledge-base`
- **Method**: POST
- **Headers**: 
  - `Content-Type: application/json`
  - `X-API-Key: your_secret_key`
- **Body**: JSON
```json
{
  "knowledge_base_id": "kb_123456"
}
```

#### Add Sources
- **URL**: `https://your-project.vercel.app/api/add-sources`
- **Method**: POST
- **Headers**: 
  - `Content-Type: application/json`
  - `X-API-Key: your_secret_key`
- **Body**: JSON
```json
{
  "knowledge_base_id": "kb_123456",
  "texts": [{"title": "New Info", "text": "Content"}],
  "files": ["base64_file_content"]
}
```

#### Delete Source
- **URL**: `https://your-project.vercel.app/api/delete-source`
- **Method**: POST
- **Headers**: 
  - `Content-Type: application/json`
  - `X-API-Key: your_secret_key`
- **Body**: JSON
```json
{
  "knowledge_base_id": "kb_123456",
  "source_id": "source_789"
}
```

## Security Notes
- All endpoints require API key authentication
- Never expose your API keys in make.com scenarios
- Use environment variables for sensitive data
- Monitor Vercel logs for unauthorized access attempts

## File Upload Notes
- Files should be base64 encoded strings
- make.com can convert files to base64 using built-in functions
- Supported formats: .txt, .pdf, .docx, .csv, etc.
- File size limit: 50MB per file