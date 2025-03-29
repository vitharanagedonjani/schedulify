import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import {
	checkDependencies,
	checkProjectStructure,
	installComponent,
	installDependencies,
	setupTailwind,
} from '../lib/utils';

export async function init() {
	console.log(chalk.bold('\n🗓  Welcome to Schedulify\n'));

	const spinner = ora('Checking project structure...').start();

	try {
		await checkProjectStructure();
		spinner.succeed('Project structure valid');

		// Check dependencies
		spinner.start('Checking dependencies...');
		const missingDeps = await checkDependencies();

		if (
			missingDeps.dependencies.length > 0 ||
			missingDeps.devDependencies.length > 0
		) {
			spinner.info('Installing missing dependencies...');
			await installDependencies(missingDeps);
			spinner.succeed('Dependencies installed');
		} else {
			spinner.succeed('All dependencies are installed');
		}

		spinner.start('Setting up Tailwind CSS...');
		await setupTailwind();
		spinner.succeed('Tailwind CSS configured');

		const response = await prompts([
			{
				type: 'select',
				name: 'framework',
				message: 'Which framework are you using?',
				choices: [
					{ title: 'React', value: 'react' },
					{ title: 'Next.js', value: 'next' },
				],
			},
			{
				type: 'text',
				name: 'directory',
				message: 'Where should we install the components?',
				initial: 'components/schedulify',
			},
			{
				type: 'multiselect',
				name: 'components',
				message: 'Select components to install',
				choices: [{ title: 'Timeline View', value: 'timeline-view' }],
			},
		]);

		spinner.start('Installing components...');

		for (const component of response.components) {
			await installComponent(component, response.directory);
		}

		spinner.succeed(chalk.green('Schedulify initialized successfully!'));
		console.log('\nNext steps:');
		console.log(
			'1. Import your components from:',
			chalk.cyan(response.directory)
		);
		console.log('2. Start using the TimelineView component in your project');
		console.log('3. Check the documentation for usage examples\n');
	} catch (error) {
		spinner.fail('Failed to initialize Schedulify');
		console.error(
			chalk.red(error instanceof Error ? error.message : 'Unknown error')
		);
		process.exit(1);
	}
}
