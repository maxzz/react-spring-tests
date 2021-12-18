import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import url from '@rollup/plugin-url';
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    plugins: [react()]
});
