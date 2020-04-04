async function Pokedex(root, args, context) {
  const where = args.where ? args.where : {};
  const orderBy = args.orderBy ? args.orderBy : undefined;
  const skip = args.skip ? args.skip : undefined;
  const after = args.after ? args.after : undefined;
  const before = args.before ? args.before : undefined;
  const first = args.first ? args.first : undefined;
  const last = args.first ? args.first : undefined;
  const select = args.select ? args.select : undefined;
  const include = args.include ? args.include : undefined;
  return context.prisma.pokemon.findMany({ where, orderBy, skip, after, before, first, last, select, include}); 
}

module.exports = { Pokedex };