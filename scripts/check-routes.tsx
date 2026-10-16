import assert from 'node:assert';
import { parsePath, pathFor } from '../App.tsx';
const cases: [string, string, string | null][] = [['/', 'en', null], ['/ko', 'ko', null], ['/ko/', 'ko', null], ['/case/vodabi', 'en', 'vodabi'], ['/case/vodabi/', 'en', 'vodabi'], ['/ko/case/chekki-teacher', 'ko', 'chekki-teacher'], ['/case/nope', 'en', null], ['/korea', 'en', null]];
for (const [p, l, c] of cases) assert.deepStrictEqual(parsePath(p), { locale: l, caseId: c }, p);
for (const l of ['en', 'ko'] as const) for (const c of [null, 'vodabi']) assert.deepStrictEqual(parsePath(pathFor(l, c)), { locale: l, caseId: c });
console.log('routes ok');
