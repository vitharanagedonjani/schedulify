import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export async function checkProjectStructure() {
	try {
		// Check if we're in a Node.js project
		await fs.access('package.json');
		return true;
	} catch {
		throw new Error(
			'No package.json found. Please run this command in a Node.js project.'
		);
	}
}

export async function createDirectory(dir: string) {
	try {
		await fs.mkdir(dir, { recursive: true });
	} catch (error) {
		console.error(chalk.red(`Failed to create directory: ${dir}`));
		throw error;
	}
}

export async function installComponent(
	componentName: string,
	targetDir: string
) {
	try {
		// Create components directory if it doesn't exist
		const componentsDir = path.join(process.cwd(), targetDir);
		await createDirectory(componentsDir);

		// Copy component template
		const templatePath = path.join(
			__dirname,
			'../templates',
			`${componentName}.tsx`
		);
		const targetPath = path.join(componentsDir, `${componentName}.tsx`);

		await fs.copyFile(templatePath, targetPath);
		return true;
	} catch (error) {
		console.error(chalk.red(`Failed to install component: ${componentName}`));
		throw error;
	}
}

interface Dependencies {
	dependencies: string[];
	devDependencies: string[];
}

const REQUIRED_DEPENDENCIES: Dependencies = {
	dependencies: ['react', 'react-dom', '@tanstack/react-virtual', 'date-fns'],
	devDependencies: [
		'tailwindcss',
		'postcss',
		'autoprefixer',
		'@types/react',
		'@types/react-dom',
	],
};

export async function checkDependencies(): Promise<Dependencies> {
	const missing: Dependencies = {
		dependencies: [],
		devDependencies: [],
	};

	try {
		const packageJson = JSON.parse(await fs.readFile('package.json', 'utf-8'));

		for (const dep of REQUIRED_DEPENDENCIES.dependencies) {
			if (!packageJson.dependencies?.[dep]) {
				missing.dependencies.push(dep);
			}
		}

		for (const dep of REQUIRED_DEPENDENCIES.devDependencies) {
			if (!packageJson.devDependencies?.[dep]) {
				missing.devDependencies.push(dep);
			}
		}

		return missing;
	} catch (_error) {
		throw new Error('Failed to read package.json');
	}
}

export async function installDependencies(deps: Dependencies): Promise<void> {
	if (deps.dependencies.length > 0) {
		const command = `bun add ${deps.dependencies.join(' ')}`;
		await execCommand(command);
	}

	if (deps.devDependencies.length > 0) {
		const command = `bun add -d ${deps.devDependencies.join(' ')}`;
		await execCommand(command);
	}
}

async function execCommand(command: string): Promise<void> {
	try {
		const proc = Bun.spawn(command.split(' '), {
			stdout: 'inherit',
			stderr: 'inherit',
		});
		if ((await proc.exited) !== 0) {
			throw new Error(`Command failed with exit code ${await proc.exited}`);
		}
	} catch (_error) {
		throw new Error(`Failed to execute command: ${command}`);
	}
}

export async function setupTailwind(): Promise<void> {
	const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
}`;

	const postcssConfig = `export default {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	},
}`;

	try {
		await fs.writeFile('tailwind.config.js', tailwindConfig);
		await fs.writeFile('postcss.config.js', postcssConfig);

		// Create CSS file with Tailwind directives
		const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

		await createDirectory('src/styles');
		await fs.writeFile('src/styles/globals.css', cssContent);
	} catch (_error) {
		throw new Error('Failed to create Tailwind configuration files');
	}
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
