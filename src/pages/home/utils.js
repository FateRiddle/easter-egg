export function $(slt, ele) {
  return (ele || document).querySelector(slt);
}

export default {
  $,
};
