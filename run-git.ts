import { execSync } from 'child_process';

function run(cmd: string) {
  try {
    const stdout = execSync(cmd, { encoding: 'utf8' });
    console.log(`=== RUNNING: ${cmd} ===`);
    console.log(stdout);
  } catch (err: any) {
    console.error(`=== FAILED: ${cmd} ===`);
    console.error(err.stdout || err.message);
  }
}

run('git status');
run('git diff --stat');
