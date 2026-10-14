/* ==========================================================
   verificar.js — Autoevaluación de la actividad Git y GitHub I
   ----------------------------------------------------------
   Uso (desde la carpeta mi-portafolio):
       node verificar.js
   Revisa tu repositorio y te dice qué te falta.
   No modifica nada. NO es la nota final: el instructor
   califica con la rúbrica de RETO.md.
   ========================================================== */
const { execSync } = require('child_process');
const fs = require('fs');

const OK = '\x1b[32m✔\x1b[0m';
const NO = '\x1b[31m✘\x1b[0m';
let aprobadas = 0;
let total = 0;

function git(cmd) {
  try {
    return execSync(`git ${cmd}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return null;
  }
}

function revisar(titulo, cumple, pista) {
  total++;
  if (cumple) {
    aprobadas++;
    console.log(`${OK} ${titulo}`);
  } else {
    console.log(`${NO} ${titulo}\n    → ${pista}`);
  }
}

function estaIgnorado(ruta) {
  try {
    execSync(`git check-ignore -q --no-index "${ruta}"`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

console.log('\n=== Verificación: Git y GitHub I ===\n');

// 1. Repositorio
const esRepo = git('rev-parse --is-inside-work-tree') === 'true';
revisar('La carpeta es un repositorio Git', esRepo, 'Ejecuta: git init');
if (!esRepo) {
  console.log('\nSin repositorio no se puede revisar lo demás. Empieza por la Parte A de la guía.\n');
  process.exit(1);
}

// 2. Identidad
revisar('user.name y user.email configurados',
  git('config user.name') && git('config user.email'),
  'git config --global user.name "Tu Nombre"  y  git config --global user.email "tu@correo.com"');

// 3. .gitignore
revisar('Existe el archivo .gitignore', fs.existsSync('.gitignore'), 'Crea .gitignore en la raíz del proyecto (Parte A, paso 4)');

const guiados = ['.env', 'node_modules/libreria-falsa/index.js', 'debug.log', '.DS_Store'];
const delReto = ['config.local.json', 'respaldos/index-copia-vieja.html'];
guiados.forEach((r) => revisar(`Git ignora ${r}`, estaIgnorado(r), `Agrega la regla correspondiente a .gitignore`));
delReto.forEach((r) => {
  revisar(`[Reto] .gitignore incluye ${r}`, estaIgnorado(r), 'Hay archivos que no deberían estar en GitHub. Agrégalos a .gitignore');
  revisar(`[Reto] ${r} ya no está en el repositorio`, !git(`ls-files "${r}"`),
    'Agregarlo a .gitignore no basta si ya estaba subido: investiga git rm --cached');
});

// 4. Historial limpio
const historial = (git('log --all --name-only --format=') || '').split('\n');
const sensibles = historial.filter((f) => /(^|\/)\.env$|node_modules\/|\.log$/.test(f));
revisar('.env, node_modules/ y los .log nunca entraron al historial', sensibles.length === 0,
  `Se encontraron en commits: ${[...new Set(sensibles)].join(', ')}. Pide ayuda al instructor.`);

// 5. Commits
const commits = (git('log --format=%s') || '').split('\n').filter(Boolean);
revisar(`Al menos 7 commits (tienes ${commits.length})`, commits.length >= 7,
  'Haz commits pequeños: uno por cada cambio con sentido');

const malos = commits.filter((m) => m.length < 10 || /^(cambios?|update|arreglos?|asdf|commit|\.+|fix|test)$/i.test(m.trim()));
revisar('Todos los mensajes de commit son descriptivos', malos.length === 0,
  `Mensajes poco claros: "${malos.join('", "')}". Usa el formato tipo: descripción`);

// 6. README
const readme = fs.existsSync('README.md') ? fs.readFileSync('README.md', 'utf8') : '';
revisar('Existe README.md', readme.length > 0, 'Crea README.md en la raíz (Reto)');
if (readme) {
  const h1 = /^# .+/m.test(readme);
  const h2 = (readme.match(/^## .+/gm) || []).length;
  const lista = /^\s*[-*] .+/m.test(readme);
  const enlace = /\[[^\]]+\]\([^)]+\)/.test(readme);
  const codigo = /```/.test(readme);
  revisar('[Reto] README con título (#) y al menos 4 secciones (##)', h1 && h2 >= 4, `Tienes ${h2} secciones ##`);
  revisar('[Reto] README usa lista, enlace y bloque de código', lista && enlace && codigo,
    'Usa - para listas, [texto](url) para enlaces y ``` para bloques de código');
  revisar('[Reto] README sin plantilla sin completar (TODO)', !/TODO/i.test(readme), 'Quita los TODO del README');
}

// 7. index.html completo
const html = fs.existsSync('index.html') ? fs.readFileSync('index.html', 'utf8') : '';
const htmlSinComentarios = html.replace(/<!--[\s\S]*?-->/g, '');
revisar('index.html sin TODO pendientes (Sobre mí, Contacto y Proyectos)', !/TODO/.test(htmlSinComentarios),
  'Busca "TODO" en index.html y complétalos');
const tarjetas = (htmlSinComentarios.match(/<article class="tarjeta">/g) || []).length;
revisar(`[Reto] Al menos 3 tarjetas de proyecto (tienes ${tarjetas})`, tarjetas >= 3, 'Agrega más <article class="tarjeta">');

// 8. Remoto y push
const remoto = git('remote get-url origin');
revisar('El remoto origin apunta a GitHub', remoto && remoto.includes('github.com'),
  'git remote add origin https://github.com/TU-USUARIO/mi-portafolio.git');

const rama = git('branch --show-current');
revisar('La rama se llama main', rama === 'main', 'git branch -M main');
const local = git('rev-parse HEAD');
const remota = git(`rev-parse origin/${rama}`);
const limpio = (git('status --porcelain') || '') === '';
revisar('No hay cambios sin commit', limpio, 'Ejecuta git status, luego git add y git commit');
revisar('Todo está subido a GitHub (push al día)', remota && local === remota,
  `Ejecuta: git push -u origin ${rama || 'main'}`);

console.log(`\nResultado: ${aprobadas} de ${total} verificaciones correctas.`);
console.log(aprobadas === total
  ? '¡Listo! Copia el enlace de tu repositorio y entrégalo.\n'
  : 'Sigue trabajando en los puntos marcados con ✘.\n');
