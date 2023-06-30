export function camelToSnakeCase(obj: any) {
  if (typeof obj !== 'object') return obj;
  if (obj.constructor.name === 'Array') {
    return Object.values(obj).map((item: Object) => camelToSnakeCase(item));
  }
  return Object.keys(obj).reduce((root, value) => {
    const key = value.replace(/([A-Z])/g, function ($1) {
      return '_' + $1.toLowerCase();
    });
    root[key] = camelToSnakeCase(obj[value]);
    return root;
  }, {} as any);
}