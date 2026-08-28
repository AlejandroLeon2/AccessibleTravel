import { execFileSync, spawn } from 'node:child_process';

function portIsBusy(port) {
  try {
    execFileSync('lsof', ['-tiTCP:' + port, '-sTCP:LISTEN'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

if (portIsBusy(9000) || portIsBusy(4001)) {
  console.error('TinaCMS ya está ejecutándose en los puertos 9000/4001.');
  console.error('Detén la instancia anterior antes de iniciar otra:');
  console.error('  pnpm run dev:stop');
  process.exit(1);
}

const tina = spawn('pnpm', ['exec', 'tinacms', 'dev'], {
  detached: true,
  stdio: 'inherit',
});
const astro = spawn('pnpm', ['exec', 'astro', 'dev'], {
  detached: true,
  stdio: 'inherit',
});
const processes = [tina, astro];

let shuttingDown = false;

function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of processes) {
    try {
      process.kill(-child.pid, 'SIGTERM');
    } catch {
      child.kill('SIGTERM');
    }
  }

  try {
    execFileSync('pnpm', ['exec', 'astro', 'dev', 'stop'], { stdio: 'inherit' });
  } catch {
    // Astro may already be stopped when Tina exits first.
  }

  process.exitCode = exitCode;
}

tina.on('exit', (code) => {
  if (!shuttingDown) shutdown(code ?? 1);
});

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
