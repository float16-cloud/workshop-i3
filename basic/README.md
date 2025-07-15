# Basic AI Examples

This directory contains basic examples of AI integration using various libraries and APIs.

## Installation

To install dependencies:

```bash
bun install
```

## Environment Setup

Before running the examples, you need to set up your environment variables:

1. Navigate to the `/examples` directory
2. Create a `.env` file based on `.env.example` (if available)
3. Add your API keys to the `.env` file

Common environment variables you might need:
- `OPENAI_API_KEY` - Your OpenAI API key
- Other API keys as required by specific examples

## Running Examples

To run any example:

1. Navigate to the `/examples` directory:
```bash
cd examples
```

2. Run the desired example file:
```bash
bun run {filename}.ts
```

Example command:
```bash
bun run openai-basic.ts
```

