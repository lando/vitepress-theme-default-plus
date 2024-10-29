
export default function(path, domains = []) {
  // separate out strings and regex
  const regexers = domains.filter(domain => domain instanceof RegExp) ?? [];
  const stringers = domains.filter(domain => typeof domain === 'string') ?? [];

  return false
    || stringers.find(domain => path.startsWith(domain)) !== undefined
    || regexers.map(regexer => regexer.test(path)).find(matched => matched === true) !== undefined;
}
