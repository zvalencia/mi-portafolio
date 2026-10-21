#!/usr/bin/env node
/*
 * verificar-plan.js · Git y GitHub II (Planear en GitHub) · SENA CDITI
 *
 * Autoevaluación de la actividad. Ejecútalo desde la raíz de tu repositorio:
 *
 *     node verificar-plan.js
 *
 * Parte 1 (local, 24 pts): revisa tus archivos y tu historial de commits.
 * Parte 2 (GitHub, 6 pts): consulta tus issues en github.com (necesita internet).
 *   Si GitHub responde "límite de consultas", vuelve a intentar más tarde o
 *   define un token:  GITHUB_TOKEN=tu_token node verificar-plan.js
 *
 * No modifica nada: solo lee.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const RAIZ = process.cwd();
const API = process.env.GITHUB_API || 'https://api.github.com';
const VERDE = '\x1b[32m', ROJO = '\x1b[31m', AMARILLO = '\x1b[33m', GRIS = '\x1b[90m', NEGRITA = '\x1b[1m', FIN = '\x1b[0m';

const resultados = [];
function revisar(seccion, nombre, puntos, ok, pista) {
  resultados.push({ seccion, nombre, puntos, ok: !!ok, pista });
}

function leer(rel) {
  try { return fs.readFileSync(path.join(RAIZ, rel), 'utf8'); } catch { return null; }
}

function sh(cmd) {
  try { return execSync(cmd, { cwd: RAIZ, stdio: ['ignore', 'pipe', 'ignore'] }).toString(); } catch { return null; }
}

// ---------- utilidades de análisis ----------
function frontMatter(txt) {
  const m = txt && txt.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return null;
  const datos = {};
  for (const linea of m[1].split('\n')) {
    const k = linea.match(/^(\w+)\s*:\s*(.*)$/);
    if (k) datos[k[1]] = k[2].replace(/^["']|["']$/g, '').trim();
  }
  return datos;
}

// Divide el backlog en bloques "## HU-0X ..."
function historias(backlog) {
  const mapa = {};
  if (!backlog) return mapa;
  const partes = backlog.split(/^## (?=HU-\d+)/m).slice(1);
  for (const parte of partes) {
    const id = parte.match(/^HU-(\d+)/)[1].padStart(2, '0');
    // quitar comentarios HTML para no contar pistas como contenido
    mapa[id] = parte.replace(/<!--[\s\S]*?-->/g, '');
  }
  return mapa;
}

const RE_CRITERIO = /^\s*-\s*\[[ xX]\]\s*Dado\b.+\bcuando\b.+\bentonces\b.+/gim;
function contarCriterios(bloque) {
  return (bloque.match(RE_CRITERIO) || []).length;
}
function numeroIssue(bloque) {
  const m = bloque && bloque.match(/\*\*Issue:\*\*\s*#(\d+)/);
  return m ? Number(m[1]) : null;
}

const RE_CIERRE = /\b(close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s+#(\d+)/gi;
function issuesCerradosEnCommits(mensajes) {
  const cerrados = new Map(); // numero -> palabra clave usada
  let m;
  RE_CIERRE.lastIndex = 0;
  while ((m = RE_CIERRE.exec(mensajes))) {
    cerrados.set(Number(m[2]), m[1].toLowerCase());
  }
  return cerrados;
}

function archivosCss(dir, prof = 0) {
  let lista = [];
  if (prof > 3) return lista;
  let entradas = [];
  try { entradas = fs.readdirSync(dir, { withFileTypes: true }); } catch { return lista; }
  for (const e of entradas) {
    if (['node_modules', '.git', 'base-portafolio'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) lista = lista.concat(archivosCss(p, prof + 1));
    else if (e.name.endsWith('.css')) lista.push(p);
  }
  return lista;
}

// ---------- PARTE 1: local ----------
function parteLocal() {
  const S1 = 'Plantillas de issue';
  const hu = frontMatter(leer('.github/ISSUE_TEMPLATE/historia-de-usuario.md'));
  revisar(S1, 'Plantilla "Historia de usuario" con encabezado (name, about, labels)', 2,
    hu && hu.name && hu.about && /historia/i.test(hu.labels || ''),
    'Debe existir .github/ISSUE_TEMPLATE/historia-de-usuario.md con labels: historia');

  const bugTxt = leer('.github/ISSUE_TEMPLATE/reporte-de-bug.md');
  const bug = frontMatter(bugTxt);
  const bugCuerpo = bugTxt ? bugTxt.replace(/^---[\s\S]*?\n---/, '') : '';
  const seccionesBug = ['Pasos para reproducir', 'Resultado esperado', 'Resultado actual'];
  revisar(S1, 'Plantilla "Reporte de bug" completa (sin TODO, labels: bug)', 3,
    bugTxt && bug && !/TODO/.test(bugTxt) && /\bbug\b/i.test(bug.labels || '') &&
      bug.about && seccionesBug.every((s) => bugCuerpo.includes(s)),
    'Cambia los TODO de reporte-de-bug.md, usa labels: bug y conserva las secciones');

  const S2 = 'Historias de usuario (planeacion/backlog.md)';
  const backlog = leer('planeacion/backlog.md');
  const H = historias(backlog);
  for (const id of ['03', '04', '05']) {
    const b = H[id] || '';
    revisar(S2, `HU-${id}: mínimo 3 criterios Dado / cuando / entonces`, 1,
      b && !/TODO/.test(b) && contarCriterios(b) >= 3,
      `Completa los criterios de HU-${id} y borra los TODO`);
  }
  const b6 = H['06'] || '';
  revisar(S2, 'HU-06 (reto): historia propia con Como / quiero / para y 3+ criterios', 2,
    b6 && !/TODO/.test(b6) && /\bComo\b[\s\S]+\bquiero\b[\s\S]+\bpara\b/i.test(b6) && contarCriterios(b6) >= 3,
    'Escribe tu historia HU-06 completa y borra los TODO');
  const numeros = ['01', '02', '03', '04', '05', '06'].map((id) => numeroIssue(H[id]));
  revisar(S2, 'Cada HU tiene su número de issue (**Issue:** #n)', 1,
    numeros.every((n) => n) && new Set(numeros).size === 6,
    'Escribe el número del issue de cada historia (todos diferentes)');

  const S3 = 'Implementación en el código';
  const html = leer('index.html') || '';
  const css = archivosCss(RAIZ).map((f) => fs.readFileSync(f, 'utf8')).join('\n') + (html.match(/<style[\s\S]*?<\/style>/gi) || []).join('\n');
  revisar(S3, 'HU-01: menú <nav> con enlaces a las secciones', 1,
    /<nav[\s\S]*href="#sobre-mi"[\s\S]*href="#proyectos"[\s\S]*href="#contacto"[\s\S]*<\/nav>/i.test(html) ||
    (/<nav/i.test(html) && (html.match(/<nav[\s\S]*?<\/nav>/i)?.[0].match(/href="#/g) || []).length >= 3),
    'Agrega un <nav> con al menos 3 enlaces internos (href="#...")');
  revisar(S3, 'HU-02: sección id="habilidades" con 6+ elementos <li>', 1,
    (() => { const m = html.match(/<section[^>]*id="habilidades"[\s\S]*?<\/section>/i); return m && (m[0].match(/<li/gi) || []).length >= 6; })(),
    'Crea <section id="habilidades"> con al menos 6 <li>');
  revisar(S3, 'HU-03: <footer> con enlaces', 1,
    /<footer[\s\S]*<a\s[\s\S]*<\/footer>/i.test(html), 'Agrega un <footer> con enlaces a tus redes');
  revisar(S3, 'HU-04: 3+ enlaces a repositorios de GitHub en Proyectos', 1,
    (() => { const m = html.match(/<section[^>]*id="proyectos"[\s\S]*?<\/section>/i); return m && (m[0].match(/href="https:\/\/github\.com\//gi) || []).length >= 3; })(),
    'Cada tarjeta de proyecto debe tener un enlace https://github.com/...');
  revisar(S3, 'HU-05: CSS con @media para pantallas pequeñas', 1,
    /@media[^{]*max-width/i.test(css), 'Agrega una regla @media (max-width: ...) en tu CSS');

  const S4 = 'Commits que cierran issues';
  const log = sh('git log --format=%B%n----');
  if (log === null) {
    revisar(S4, 'Repositorio Git encontrado', 7, false, 'Ejecuta este script dentro de tu repositorio (donde está la carpeta .git)');
  } else {
    const cerrados = issuesCerradosEnCommits(log);
    ['01', '02', '03', '04', '05', '06'].forEach((id, i) => {
      const n = numeros[i];
      revisar(S4, `HU-${id}: un commit la cierra (closes #${n || '?'})`, 1,
        n && cerrados.has(n), n ? `Haz un commit con "closes #${n}" en el mensaje` : `Primero escribe el número del issue de HU-${id} en el backlog`);
    });
    const entrega = leer('ENTREGA.md') || '';
    const nBug = (entrega.match(/Issue del bug[^#]*#(\d+)/i) || [])[1];
    revisar(S4, `Bug del reto cerrado con "fixes #${nBug || '?'}"`, 1,
      nBug && /^fix/.test(cerrados.get(Number(nBug)) || ''),
      'Anota el número del bug en ENTREGA.md y ciérralo con un commit "fixes #n"');
  }

  const S5 = 'Entrega';
  const entrega = leer('ENTREGA.md') || '';
  revisar(S5, 'ENTREGA.md con la URL pública del tablero de GitHub Projects', 1,
    /https:\/\/github\.com\/(users|orgs)\/[\w.-]+\/projects\/\d+/.test(entrega) && !/TODO/.test(entrega.replace(/<!--[\s\S]*?-->/g, '')),
    'Completa ENTREGA.md (sin TODO) y pega la URL de tu tablero');
  return numeros;
}

// ---------- PARTE 2: GitHub ----------
function repoRemoto() {
  const url = sh('git remote get-url origin');
  const m = url && url.trim().match(/github\.com[:/]([\w.-]+)\/([\w.-]+?)(?:\.git)?$/);
  return m ? { owner: m[1], repo: m[2] } : null;
}

function token() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  const t = sh('gh auth token');
  return t ? t.trim() : null;
}

async function api(ruta) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'verificar-plan-sena' };
  const t = token();
  if (t) headers.Authorization = `Bearer ${t}`;
  let r;
  try { r = await fetch(`${API}${ruta}`, { headers }); } catch {
    throw new Error('No pude conectarme a GitHub. ¿Tienes internet?');
  }
  if (r.status === 403 || r.status === 429) throw new Error('GitHub respondió "límite de consultas". Intenta en unos minutos o usa GITHUB_TOKEN.');
  if (r.status === 404) throw new Error('No encontré el repositorio en GitHub. ¿Es público? ¿Hiciste push?');
  if (!r.ok) throw new Error(`GitHub respondió ${r.status}`);
  return r.json();
}

async function parteGitHub() {
  const S = 'En GitHub (issues reales)';
  const remoto = repoRemoto();
  if (!remoto) return { omitida: 'No hay un remoto "origin" de GitHub configurado.' };
  if (typeof fetch !== 'function') return { omitida: 'Tu versión de Node no tiene fetch (usa Node 18 o superior).' };
  try {
    const base = `/repos/${remoto.owner}/${remoto.repo}`;
    const todos = await api(`${base}/issues?state=all&per_page=100`);
    const issues = todos.filter((i) => !i.pull_request);
    const eventos = await api(`${base}/issues/events?per_page=100`);
    const porCommit = new Set(eventos.filter((e) => e.event === 'closed' && e.commit_id).map((e) => e.issue && e.issue.number));
    const conEtiqueta = issues.filter((i) => i.labels && i.labels.length > 0);
    const etiquetas = new Set(issues.flatMap((i) => (i.labels || []).map((l) => l.name.toLowerCase())));
    const cerrados = issues.filter((i) => i.state === 'closed');
    revisar(S, `7+ issues creados (tienes ${issues.length})`, 1, issues.length >= 7, '6 historias + 1 bug');
    revisar(S, `Todos los issues tienen etiqueta (${conEtiqueta.length}/${issues.length})`, 1, issues.length > 0 && conEtiqueta.length === issues.length, 'Asigna al menos una etiqueta a cada issue');
    revisar(S, 'Se usan las etiquetas "historia" y "bug"', 1, etiquetas.has('historia') && etiquetas.has('bug'), 'Crea y usa las etiquetas historia y bug');
    revisar(S, `7+ issues cerrados (tienes ${cerrados.length})`, 1, cerrados.length >= 7, 'Cierra los issues con tus commits y haz push');
    revisar(S, `6+ issues cerrados por un commit (tienes ${porCommit.size})`, 2, porCommit.size >= 6,
      'El issue debe cerrarse por el commit (closes #n + push a main), no con el botón "Close issue"');
    return { repo: `${remoto.owner}/${remoto.repo}` };
  } catch (e) {
    return { omitida: e.message };
  }
}

// ---------- reporte ----------
function imprimir(github) {
  console.log(`\n${NEGRITA}Verificación · Git y GitHub II · Planear en GitHub${FIN}\n`);
  let seccion = '';
  let obtenidos = 0, posibles = 0;
  for (const r of resultados) {
    if (r.seccion !== seccion) { seccion = r.seccion; console.log(`${NEGRITA}${seccion}${FIN}`); }
    posibles += r.puntos;
    if (r.ok) obtenidos += r.puntos;
    const marca = r.ok ? `${VERDE}✔${FIN}` : `${ROJO}✘${FIN}`;
    console.log(`  ${marca} ${r.nombre} ${GRIS}(${r.ok ? r.puntos : 0}/${r.puntos})${FIN}`);
    if (!r.ok && r.pista) console.log(`      ${AMARILLO}→ ${r.pista}${FIN}`);
  }
  if (github.omitida) {
    console.log(`${NEGRITA}En GitHub (issues reales)${FIN}\n  ${AMARILLO}⚠ No evaluado: ${github.omitida}${FIN}`);
  }
  const color = obtenidos === posibles ? VERDE : obtenidos >= posibles * 0.6 ? AMARILLO : ROJO;
  console.log(`\n${NEGRITA}Puntaje: ${color}${obtenidos} / ${posibles}${FIN}${github.omitida ? ` ${GRIS}(sin la parte de GitHub; el total completo es 30)${FIN}` : ''}`);
  console.log(`${GRIS}Recuerda: el tablero de GitHub Projects lo revisa el instructor en la URL de ENTREGA.md.${FIN}\n`);
}

(async () => {
  parteLocal();
  const gh = await parteGitHub();
  imprimir(gh);
})();
