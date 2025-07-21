# Apex

<div align="center">
  <a href="https://geist-ui.dev/" target="_blank" rel="noopener noreferrer">
    <img src="public/apex.png" alt="Apex Logo" width="180" />
  </a>
  <br/>
  <b>A modern, powerful no-code solution for building and deploying AI agents, built with <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a> and the <a href="https://geist-ui.dev/" target="_blank" rel="noopener noreferrer">Geist Design System</a>.</b>
  <br/>
  <br/>
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsheikh-developer%2FApex)
</div>

## Overview

Apex is a professional-grade, UI-generative platform for creating and managing AI agents. It's designed for mobile-first experiences and leverages the Vercel design system for a consistent and beautiful user interface.

## Features

- **No-Code Agent Creation**: Build sophisticated AI agents without writing any code.
- **MCP Integration**: Seamlessly connect to MCP servers for tools like Puppeteer, Playwright, GitHub, and local file system access.
- **Autonomous Operation**: Agents are designed to perform tasks automatically without requiring user approval for each step. This is explicitly configured in `mcp.config.json`.
- **Extensible Agent Templates**: Use and customize pre-built agent templates for common tasks like web scraping, file processing, and research.
- **Secure by Design**: The platform includes security features like safe mode, domain restrictions, and file system access controls.
- **Geist Design System**: A beautiful and consistent UI powered by Vercel's design system.
- **Mobile Friendly**: Fully responsive and optimized for mobile devices.

## How It Works

The platform uses a central configuration file, `mcp.config.json`, to define available MCP servers, agent templates, and security settings. The `ApexMCPAgent` class orchestrates the interaction between the AI model and the MCP tools, enabling agents to perform complex, multi-step tasks.

### Automatic Operations

By default, the Apex AI Agent Platform is configured for autonomous agent operation. The `mcp.config.json` file includes the following setting to ensure that agents can perform their tasks without requiring manual approval:

```json
"automation": {
  "requireApproval": false
}
```

This allows agents to seamlessly execute tasks such as web scraping, file manipulation, and API interactions in a fully automated manner.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Configure MCP Servers**: Edit `mcp.config.json` to add or remove MCP servers based on your needs.
3.  **Define Agent Templates**: Create new agent templates in `mcp.config.json` to define the capabilities of your agents.
4.  **Run the Application**:
    ```bash
    npm run dev
    ```

## Available Agent Templates

-   **Web Scraper Agent**: For automated data extraction from websites.
-   **File Processing Agent**: For batch processing and transformation of files.
-   **GitHub Monitor Agent**: For monitoring repositories and automating GitHub workflows.
-   **Research Assistant Agent**: For comprehensive research and data analysis.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Geist Design System](https://geist-ui.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vercel](https://vercel.com/)

## Brand Assets

Learn how to work with our brand assets.

- **Icons**: Icon set tailored for developer tools.
- **Colors**: A high contrast, accessible color system.
- **Grid**: A huge part of the new Vercel aesthetic.
- **Typeface**: Geist Sans and Geist Mono, specifically designed for developers and designers.
