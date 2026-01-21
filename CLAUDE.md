# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vercel serverless backend for Retell AI knowledge base management, designed for integration with make.com automation workflows. It provides authenticated REST API endpoints for CRUD operations on Retell AI knowledge bases.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start local development server (vercel dev)
npm run build        # Build serverless functions
npm run deploy       # Deploy to Vercel production
```

## Architecture

**Serverless Function Pattern**: Each API endpoint in `/api/` is a standalone Vercel function handler:

```
api/
├── create-knowledge-base.js   # Create new knowledge base
├── add-sources.js             # Add sources to existing KB
├── delete-knowledge-base.js   # Delete entire knowledge base
└── delete-source.js           # Remove specific source from KB
```

All endpoints follow an identical pattern:
1. Authenticate via `X-API-Key` header against `MAKE_COM_API_KEY` env var
2. Enforce POST-only requests
3. Validate required parameters
4. Call Retell SDK method
5. Return JSON response with success/error

**Retell SDK Client**: Initialized once per file with `process.env.RETELL_API_KEY`:
```javascript
import Retell from 'retell-sdk';
const client = new Retell({ apiKey: process.env.RETELL_API_KEY });
```

## Environment Variables

Required in Vercel dashboard (see `env.example`):
- `RETELL_API_KEY` - Retell AI API key
- `MAKE_COM_API_KEY` - Secret key for authenticating incoming requests

## API Authentication

All endpoints require the `X-API-Key` header matching `MAKE_COM_API_KEY`. Unauthorized requests return 401.

## Response Codes

- 200: Success
- 400: Missing required parameters
- 401: Invalid/missing API key
- 405: Non-POST request
- 500: Retell SDK or processing error

## File Handling

Files must be base64 encoded strings in request body arrays. The `formidable` dependency is included but not actively used (manual base64 handling).
