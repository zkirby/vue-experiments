import { name, propsObs, dataObs, computedWatchers } from "./debug.js";

/*
 * Log render information for a component
 */
export function logVmInfo(vm) {
  const watcher = vm._watcher;
  cLog(`Component %c${name(vm)}%c (id: ${vm._uid})`, [green]);
  cLog(
    `has render watcher-id %c${watcher.id}%c with ${watcher.deps.length} dependencies`,
    [blueBg]
  );
}

/*
 * Log an Observers object
 */
function logObs(obs) {
  Object.entries(obs).forEach(([id, { value, depSubs }]) => {
    const subs = getSubLog(depSubs);
    cLog(`Observer %c${id}%c`, [greenBg]);
    cLog(`  value: ${value}`);
    cLog(
      `  subs: ${subs.length > 0 ? subs : "[]"}`,
      Array(subs.length).fill(greenBg)
    );
  });
}

/*
 * Log a list of Watchers
 */
function logWatchers(watchers) {
  watchers.forEach(w => {
    const deps = getDepLog(w.deps);
    cLog(`Watcher %c${w.name}%c (id: %c${w.id}%c)`, [green, blueBg]);
    cLog(
      `  depends on: ${deps.length > 0 ? deps : "[]"}`,
      Array(deps.length).fill(greenBg)
    );
  });
}

/*
 * Log the props observers
 */
export function logPropsObs(vm) {
  logObs(propsObs(vm));
}

/*
 * Log the data observers
 */
export function logDataObs(vm) {
  logObs(dataObs(vm));
}

/*
 * Log Computed watchers
 */
export function logComputedWatchers(vm) {
  logWatchers(computedWatchers(vm));
}

/*
 * Main function to print the data
 * flow of the components
 */
const f = [logVmInfo, logDataObs, logComputedWatchers];
export function printTree(vm) {
  if (!vm) return;

  cGroupStart();
  console.log(vm);
  f.forEach(fn => {
    fn(vm);
    cLogBreak();
  });

  cLogGroup();
  vm.$children.forEach(v => printTree(v));
  cGroupEnd();
}

/************************
 **** Logging Helpers ***
 ************************/
const COLOR_WHITE = "color: default";
const COLOR_VUE_GREEN = "color: #81ecec";
const COLOR_VUE_BLUE = "color: #ff7675";
const BG_VUE_GREEN = `${COLOR_VUE_BLUE}`;
const BG_VUE_BLUE = `${COLOR_VUE_GREEN}`;
const green = makeColor(COLOR_VUE_GREEN);
const blue = makeColor(COLOR_VUE_BLUE);
const greenBg = makeColor(BG_VUE_BLUE);
const blueBg = makeColor(BG_VUE_GREEN);

const groups = [];

function cGroupStart() {
  groups.push([]);
  console.group();
}

function cLogGroup() {
  const group = groups[groups.length - 1];

  let s = "";
  let c = [];
  group.forEach(([statement, colors]) => {
    s += statement + "\n";
    c.push(...colors.flat());
  });
  console.log(s, ...c);
}

function cGroupEnd() {
  if (groups.length === 0) return;

  groups.pop();
  console.groupEnd();
}

function cLog(statement, colors = []) {
  if (groups.length > 0) {
    groups[groups.length - 1].push([statement, colors]);
  } else {
    console.log(statement, ...colors);
  }
}

export function cLogBreak() {
  cLog("", []);
}

/************************
 *** Vue Data Helpers ***
 ************************/
function makeColor(color) {
  return [color, COLOR_WHITE];
}

function sortById(a, b) {
  return a.id - b.id;
}

function getDepLog(deps) {
  deps.sort(sortById);
  return deps.map(d => ` %c${d.id}%c (${d.subs.length} subs)`);
}

function getSubLog(subs) {
  subs.sort(sortById);
  return subs.map(s => ` %c${s.id}%c (${s.deps.length} deps)`);
}
