import { SandpackClient } from './sandpack-client';
import type { SandboxSetup } from '@codesandbox/sandpack-client';

let client: SandpackClient;

export async function getSandpackClient(): Promise<SandpackClient> {
  if (client) {
    return client;
  }

  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  client = new SandpackClient(iframe);
  await client.init({
    files: {},
    dependencies: {
      'react': '^18.0.0',
      'react-dom': '^18.0.0'  
    },
    template: undefined // Let sandpack infer from dependencies
  });

  return client;
}

export const sandpackClient = getSandpackClient();
