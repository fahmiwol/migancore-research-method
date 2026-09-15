#!/usr/bin/env node
/**
 * prepublish-scan.mjs — a gate to run before making a directory public.
 *
 * Scans text files for credentials, personal data and private-infrastructure details.
 * It NEVER prints a matched value: findings are reported as file:line:kind only, so the
 * scan itself cannot leak what it finds.
 *
 * Why it exists: in the audit before this repository's first release, two public
 * repositories in the same ecosystem were found to contain a personal email address,
 * server IP addresses, server paths and hard-coded fallback secrets. None of them was
 * a live key — each was the kind of detail that is invisible in review because it looks
 * like ordinary text.
 *
 * Usage:
 *   node tools/prepublish-scan.mjs <dir>            exit 1 if anything is found
 *   node tools/prepublish-scan.mjs <dir> --allow f  f = lines "relative/path:line:kind  # reason"
 *   node tools/prepublish-scan.mjs --test           self-test, no files
 *
 * No dependencies. MIT.
 */
import fs from 'node:fs';
import path from 'node:path';

export const PATTERNS = [
  // credentials
  { kind: 'private-key', re: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/ },
  { kind: 'aws-access-key', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { kind: 'github-token', re: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b|\bgithub_pat_[A-Za-z0-9_]{20,}\b/ },
  { kind: 'openai-style-key', re: /\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{20,}\b/ },
  { kind: 'google-api-key', re: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  { kind: 'google-oauth-token', re: /\bya29\.[0-9A-Za-z_-]{20,}\b/ },
  { kind: 'google-oauth-client-secret', re: /\bGOCSPX-[0-9A-Za-z_-]{20,}\b/ },
  { kind: 'slack-token', re: /\bxox[abprs]-[0-9A-Za-z-]{10,}\b/ },
  { kind: 'huggingface-token', re: /\bhf_[A-Za-z0-9]{30,}\b/ },
  { kind: 'nvidia-key', re: /\bnvapi-[A-Za-z0-9_-]{20,}\b/ },
  { kind: 'jwt', re: /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/ },
  { kind: 'assigned-secret', re: /\b(?:password|passwd|secret|api[_-]?key|access[_-]?token|auth[_-]?token)\b\s*[:=]\s*["'][^"'\s]{8,}["']/i },
  // personal data
  { kind: 'email', re: /\b[A-Za-z0-9._%+-]+@(?!example\.(?:com|org)\b|users\.noreply\.github\.com\b|anthropic\.com\b)[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/ },
  { kind: 'phone-id', re: /(?:\+62|\b08)\d{8,12}\b/ },
  // private infrastructure
  { kind: 'ipv4', re: /\b(?!(?:127\.0\.0\.1|0\.0\.0\.0|192\.0\.2\.\d{1,3}|198\.51\.100\.\d{1,3}|203\.0\.113\.\d{1,3})\b)(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|1?\d?\d)){3}\b/ },
  { kind: 'mac-address', re: /\b[0-9A-Fa-f]{2}(?:[:-][0-9A-Fa-f]{2}){5}\b/ },
  { kind: 'server-path', re: /(?:^|[\s"'`(])\/(?:opt|srv|www\/server|root|home\/[a-z_][a-z0-9_-]*)\/[^\s"'`)]*/ },
  { kind: 'personal-windows-path', re: /\b[A-Za-z]:\\Users\\[^\\\s"'`]+/ },
  { kind: 'ssh-command', re: /\bssh\s+(?:-[A-Za-z]\s+\S+\s+)*[A-Za-z0-9._-]+@[A-Za-z0-9._-]+/ },
];

const SKIP_DIRS = new Set(['.git', 'node_modules', '__pycache__', '.venv', 'dist', 'build']);
const TEXT_EXT = /\.(?:md|txt|json|jsonl|js|mjs|cjs|ts|tsx|py|sh|ps1|yml|yaml|toml|cfg|ini|env|html|css|csv|cff)$/i;

export function scanText(text, file = '<text>') {
  const out = [];
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const p of PATTERNS) {
      const m = line.match(p.re);
      // `value` is kept in memory only, to honour intended-public entries; it is never printed.
      if (m) out.push({ file, line: i + 1, kind: p.kind, value: m[0].trim() });
    }
  });
  return out;
}

export function scanDir(root) {
  const out = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(p); continue; }
      if (!TEXT_EXT.test(e.name) && !/^(?:LICENSE|NOTICE|README|\.env)/.test(e.name)) continue;
      if (fs.statSync(p).size > 5 * 1024 * 1024) { out.push({ file: path.relative(root, p), line: 0, kind: 'too-large-to-scan' }); continue; }
      out.push(...scanText(fs.readFileSync(p, 'utf8'), path.relative(root, p).replace(/\\/g, '/')));
    }
  };
  walk(root);
  return out;
}

/**
 * Allow-list lines, `#` starts a comment:
 *   relative/path:line:kind          accept one finding at one location
 *   public <kind> <value>            accept an identifier the owner WANTS public, anywhere
 *                                    (e.g. a contact email for collaboration)
 */
export function applyAllow(findings, allowText) {
  const lines = String(allowText || '').split(/\r?\n/).map((l) => l.replace(/#.*$/, '').trim()).filter(Boolean);
  const located = new Set(lines.filter((l) => !l.startsWith('public ')));
  const publicValues = new Set(lines.filter((l) => l.startsWith('public ')).map((l) => l.split(/\s+/).slice(1, 3).join(' ').toLowerCase()));
  return findings.filter((f) => !located.has(`${f.file}:${f.line}:${f.kind}`)
    && !publicValues.has(`${f.kind} ${String(f.value || '').toLowerCase()}`));
}

const DIRECT = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('prepublish-scan.mjs');

if (DIRECT && process.argv.includes('--test')) {
  let ok = 0, bad = 0;
  const check = (name, cond) => { if (cond) { ok++; console.log(`  OK    ${name}`); } else { bad++; console.log(`  FAIL  ${name}`); } };
  const kinds = (t) => scanText(t).map((f) => f.kind);
  // Test strings are assembled from parts so that this file itself does not trip the scanner.
  check('private key header', kinds('-----BEGIN ' + 'RSA PRIVATE KEY-----').includes('private-key'));
  check('github token', kinds('token ' + 'ghp_' + 'a'.repeat(36)).includes('github-token'));
  check('google api key', kinds('key=' + 'AIza' + 'B'.repeat(35)).includes('google-api-key'));
  check('assigned secret', kinds('password = "' + 'hunter2hunter2' + '"').includes('assigned-secret'));
  check('personal email', kinds('write to someone' + '@' + 'gmail.com').includes('email'));
  check('noreply email allowed', !kinds('Co-Authored-By: Claude <noreply' + '@' + 'anthropic.com>').includes('email'));
  check('public IPv4', kinds('server ' + '9.' + '9.9.9').includes('ipv4'));
  check('LAN IPv4 flagged too', kinds('host ' + '192.' + '168.0.10').includes('ipv4'));
  check('localhost allowed', !kinds('http://127.0.0.1:11434').includes('ipv4'));
  check('documentation range allowed', !kinds('example 192.0.2.10').includes('ipv4'));
  check('version numbers are not IPs', !kinds('ollama 0.33.2, node 18.0.0').includes('ipv4'));
  // 00-00-5E-00-53-xx is the IANA range reserved for documentation (RFC 7042).
  check('MAC address', kinds('mac ' + '00-00-5E' + '-00-53-01').includes('mac-address'));
  check('server path', kinds('cd ' + '/o' + 'pt/' + 'myapp && pull').includes('server-path'));
  check('personal Windows path', kinds('C:' + '\\Users\\' + 'someone\\file').includes('personal-windows-path'));
  check('ssh command', kinds('ssh ' + 'root' + '@' + 'my-vps').includes('ssh-command'));
  check('plain prose is clean', scanText('A measurement made through a single path measures the path.').length === 0);
  check('allow-list removes an accepted finding', applyAllow([{ file: 'a.md', line: 3, kind: 'ipv4' }], 'a.md:3:ipv4  # doc example').length === 0);
  const contact = 'owner' + '@' + 'example.net';
  const other = 'someone' + '@' + 'example.net';
  const found = scanText(`Contact: ${contact}\nLeaked: ${other}`, 'README.md');
  const kept = applyAllow(found, `public email ${contact}  # owner wants collaborators to write`);
  check('intended-public email is accepted anywhere', !kept.some((f) => f.line === 1));
  check('any other email is still flagged', kept.some((f) => f.line === 2 && f.kind === 'email'));
  console.log(`\n${ok} passed · ${bad} failed`);
  process.exit(bad ? 1 : 0);
}

if (DIRECT && !process.argv.includes('--test')) {
  const root = process.argv[2];
  if (!root) { console.error('usage: node tools/prepublish-scan.mjs <dir> [--allow file]'); process.exit(2); }
  const i = process.argv.indexOf('--allow');
  const allow = i > 0 ? fs.readFileSync(process.argv[i + 1], 'utf8') : '';
  const findings = applyAllow(scanDir(root), allow);
  if (!findings.length) { console.log(`clean: ${root}`); process.exit(0); }
  const byKind = {};
  for (const f of findings) (byKind[f.kind] ??= []).push(`${f.file}:${f.line}`);
  for (const [k, locs] of Object.entries(byKind)) console.log(`${k} (${locs.length}): ${locs.slice(0, 20).join(', ')}${locs.length > 20 ? ' …' : ''}`);
  console.log(`\n${findings.length} finding(s). Values are never printed — open the file to review.`);
  process.exit(1);
}
