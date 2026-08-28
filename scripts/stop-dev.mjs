import { execFileSync } from 'node:child_process';

for (const port of [4321, 4001, 9000]) {
  try {
    const output = execFileSync('lsof', ['-tiTCP:' + port, '-sTCP:LISTEN'], {
      encoding: 'utf8',
    });

    for (const pid of output.trim().split('\n').filter(Boolean)) {
      try {
        process.kill(Number(pid), 'SIGTERM');
        console.log(`Proceso detenido en ${port}: ${pid}`);
      } catch {
        // El proceso pudo terminar entre lsof y kill.
      }
    }
  } catch {
    // El puerto ya está libre.
  }
}

try {
  execFileSync('pnpm', ['exec', 'astro', 'dev', 'stop'], { stdio: 'inherit' });
} catch {
  // Astro puede no tener un daemon activo.
}
