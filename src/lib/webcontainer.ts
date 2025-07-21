import { WebContainer as WC } from '@webcontainer/api';

let webcontainer: WC;

export async function getWebContainer() {
  if (webcontainer) {
    return webcontainer;
  }

  webcontainer = await WC.boot();

  return webcontainer;
}

export { webcontainer as WebContainer };