
export default function(path, domains = []) {
  // filter out non-strings
  domains = domains.filter(domain => typeof domain === 'string');

  // separate out strings and regex
  const regexers = domains.map(domain => new RegExp(domain)) ?? [];

  return false
    || domains.find(domain => path.startsWith(domain)) !== undefined
    || regexers.map(regexer => regexer.test(path)).find(matched => matched === true) !== undefined;
}
