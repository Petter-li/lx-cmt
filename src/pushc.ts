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

    // Get current branch name
    const branchResult = shelljs.exec('git symbolic-ref --short HEAD', { silent: true, cwd: cwdPath });
    
    if (branchResult.code !== 0) {
      spinner.fail('Failed to get current branch name');
      shelljs.exit(1);
      return;
    }

    const currentBranch = branchResult.stdout.trim();

    // Check if there are changes to push
    const checkChangesResult = shelljs.exec('git push --dry-run origin ' + currentBranch, { silent: true, cwd: cwdPath });
    
    if (checkChangesResult.code !== 0) {
      spinner.fail('Failed to check changes');
      shelljs.exit(1);
      return;
    }

    const output = (checkChangesResult.stdout + checkChangesResult.stderr).toLowerCase().trim();
    
    if (output.includes('up-to-date') || output.includes('up to date')) {
      spinner.stop();
      console.log('Everything up-to-date');
      shelljs.exit(0);
      return;
    }

    spinner.text = `Pushing to origin/${currentBranch}...`;

    // Push to remote
    const pushResult = shelljs.exec(`git push origin ${currentBranch}`, { silent: false, cwd: cwdPath });

    if (pushResult.code !== 0) {
      spinner.fail(`Failed to push to origin/${currentBranch}: ${pushResult.stderr}`);
      return;
    }

    spinner.succeed(`Successfully pushed to origin/${currentBranch}`);
  } catch (error: any) {
    spinner.fail(`Error: ${error.message}`);
  }
};
