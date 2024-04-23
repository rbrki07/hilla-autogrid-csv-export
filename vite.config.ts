import { overrideVaadinConfig } from './vite.generated';
import { UserConfigFn } from 'vite';

const customConfig: UserConfigFn = (env) => ({
  // Here you can add custom Vite parameters
  // https://vitejs.dev/config/
});

export default overrideVaadinConfig(customConfig);
