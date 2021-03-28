/**
 * Best guess of the components name (taken from vue src)
 */
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = function(str) {
  return str
    .replace(classifyRE, function(c) {
      return c.toUpperCase();
    })
    .replace(/[-_]/g, "");
};
export function name(vm) {
  if (vm.$root === vm) {
    return "<Root>";
  }
  const options =
    typeof vm === "function" && vm.cid != null
      ? vm.options
      : vm._isVue
      ? vm.$options || vm.constructor.options
      : vm;
  const name = options.name || options._componentTag;
  return name ? "<" + classify(name) + ">" : "<Anonymous>";
}

/**
 * Internal function to extract observers from a data source
 */
function getObservers(data) {
  let guard = 0;
  const obs = {};
  const q = [data];

  while (guard < 800 && q.length > 0) {
    const curr = q.shift();
    const cuOb = curr?.__ob__;
    if (cuOb && !(cuOb.dep.id in obs)) {
      let value = cuOb.vmCount > 0 ? "$data root" : cuOb.value;
      try {
        value = JSON.stringify(value);
      } catch {
        value = value.toString();
      }

      obs[cuOb.dep.id] = {
        depSubs: cuOb.dep.subs,
        value
      };
      q.push(...Object.values(curr));
    }
    guard += 1;
  }
  return obs;
}

/**
 * Returns the Observers from the props() property
 */
export function propsObs(vm) {
  if (!vm._props) return [];
  return getObservers(vm._props);
}

/**
 * Returns the Observers created by this components data() property
 */
export function dataObs(vm) {
  if (!vm._data) return [];
  return getObservers(vm._data);
}

/**
 * Returns the Computed Watchers created by this component
 */
export function computedWatchers(vm) {
  if (!vm._computedWatchers) return [];
  const watchers = vm._computedWatchers;

  return Object.entries(watchers).map(([k, { id, deps }]) => {
    return { name: k, id, deps };
  });
}
