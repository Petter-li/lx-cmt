import shelljs = require('shelljs');
import ora = require('ora');

module.exports = async () => {
  const cwdPath = process.cwd();
  const spinner = ora('Checking repository status...\n');
  
  try {
    spinner.start();

    // Check if current directory is a git repository
    const { code: gitCheck } = shelljs.exec('git rev-parse --is-inside-work-tree', { silent: true, cwd: cwdPath });
    if (gitCheck !== 0) {
      spinner.fail('Current directory is not a git repository');
      shelljs.exit(1);
      return;
    }

    // Check for uncommitted changes
    const { stdout: status } = shelljs.exec('git status --porcelain', { silent: true, cwd: cwdPath });
    if (status) {
      spinner.fail('You have uncommitted changes. Please commit or stash them before pulling.');
      console.log('\nUncommitted changes:');
      shelljs.exec('git status --short', { cwd: cwdPath });
      shelljs.exit(1);
      return;
    }

    spinner.text = 'Checking current branch...';
    
    // Get current branch name
    const { code: branchCode, stdout: branchStdout } = shelljs.exec('git symbolic-ref --short HEAD', { silent: true, cwd: cwdPath });
    
    if (branchCode !== 0) {
      spinner.fail('Failed to get current branch');
      shelljs.exit(1);
      return;
    }
    
    const currentBranch = branchStdout.trim();
    spinner.text = `Pulling from origin/${currentBranch}...`;
    
    // Execute git pull
    const { code: pullCode, stderr: pullStderr } = shelljs.exec(`git pull origin ${currentBranch}`, { cwd: cwdPath });
    
    if (pullCode !== 0) {
      spinner.fail(`Pull failed: ${pullStderr}`);
      shelljs.exit(1);
      return;
    }
    
    spinner.succeed(`Successfully pulled from origin/${currentBranch}`);
  } catch (error: unknown) {
    spinner.fail(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
    shelljs.exit(1);
  }
};
