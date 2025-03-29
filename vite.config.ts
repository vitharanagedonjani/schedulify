import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	root: 'src/test',
	build: {
		outDir: '../../dist/test',
	},
	server: {
		port: 3000,
	},
	css: {
		postcss: './postcss.config.js',
	},
});
