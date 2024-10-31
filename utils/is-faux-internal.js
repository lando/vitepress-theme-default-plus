
export default function(path, domains = []) {
  // separate out strings and regex
  const regexers = domains.map(domain => new RegExp(domain)) ?? [];

  return false
    || domains.find(domain => path.startsWith(domain)) !== undefined
    || regexers.map(regexer => regexer.test(path)).find(matched => matched === true) !== undefined;
}
