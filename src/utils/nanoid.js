export function nanoid(size = 21) {
    let id = '';
    while (id.length < size) {
      id += Math.random()
        .toString(36)
        .slice(2);
    }
    return id.slice(0, size);
  }