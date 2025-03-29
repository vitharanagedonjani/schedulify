#!/usr/bin/env node
import { Command } from 'commander';
import { add } from './commands/add';
import { init } from './commands/init';

const program = new Command();

program
	.name('schedulify')
	.description('CLI to add Schedulify components to your project')
	.version('0.0.1');

program
	.command('init')
	.description('Initialize Schedulify in your project')
	.action(init);

program
	.command('add')
	.description('Add Schedulify components to your project')
	.action(add);

program.parse();
