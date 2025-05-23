import shelljs from 'shelljs';
import ora from 'ora';
import Inquirer from 'inquirer';

module.exports = async (name?: string) => {
  const cwdPath = process.cwd();
  const spinner = ora('Checking git repository...\n');

  try {
    spinner.start();

    // Check if current directory is a git repository
    const { code: gitCheck } = shelljs.exec('git rev-parse --is-inside-work-tree', { silent: true, cwd: cwdPath });
    if (gitCheck !== 0) {
      spinner.fail('Current directory is not a git repository');
      shelljs.exit(1);
      return;
    }

    // Check if branch name is provided
    if (!name) {
      spinner.fail('Please provide a branch name');
      shelljs.exit(1);
      return;
    }

    // Get all local branches
    const { stdout: branchesOutput } = shelljs.exec('git branch', { silent: true, cwd: cwdPath });
    const branches = branchesOutput
      .split('\n')
      .map((b: string) => b.trim())
      .filter((b: string) => b)
      .map((b: string) => b.startsWith('* ') ? b.substring(2) : b); // Remove the * from current branch

    // Check for exact match
    const exactMatch = branches.find((b: string) => b === name);
    if (exactMatch) {
      spinner.text = `Checking out branch ${name}...`;
      const { code: checkoutCode, stderr: checkoutError } = shelljs.exec(`git checkout ${name}`, { silent: false, cwd: cwdPath });
      
      if (checkoutCode !== 0) {
        spinner.fail(`Failed to checkout branch: ${checkoutError}`);
        shelljs.exit(1);
        return;
      }

      spinner.succeed(`Switched to branch '${name}'`);
      return;
    }

    // Find matching branches
    const matchingBranches = branches.filter((b: string) => b.toLowerCase().includes(name.toLowerCase()));

    if (matchingBranches.length === 0) {
      spinner.fail(`No branches found matching '${name}'`);
      shelljs.exit(1);
      return;
    }

    // Stop spinner before showing prompt
    spinner.stop();

    // Let user select from matching branches
    const { selectedBranch } = await Inquirer.prompt({
      name: 'selectedBranch',
      type: 'list',
      message: 'Select a branch to checkout:',
      choices: matchingBranches
    });

    spinner.start(`Checking out branch ${selectedBranch}...`);
    
    const { code: checkoutCode, stderr: checkoutError } = shelljs.exec(`git checkout ${selectedBranch}`, { silent: false, cwd: cwdPath });
    
    if (checkoutCode !== 0) {
      spinner.fail(`Failed to checkout branch: ${checkoutError}`);
      shelljs.exit(1);
      return;
    }

    spinner.succeed(`Switched to branch '${selectedBranch}'`);
  } catch (error: any) {
    spinner.fail(`Error: ${error.message}`);
    shelljs.exit(1);
  }
};
