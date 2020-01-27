function updateTodo(items, itemId, newItem) {
  const itemIndex = items.map(el => el._id).indexOf(itemId);
  items.splice(itemIndex, 1, newItem);
  return items;
}

function deleteTodos(data, itemIds) {
  return data.filter(el => !itemIds.includes(el._id));
}

function markTodosAsDone(items, itemIds) {
  return items.map(el =>
    itemIds.includes(el._id) ? { ...el, done: true } : el
  );
}

function markTodosAsNotDone(items, itemIds) {
  return items.map(el =>
    itemIds.includes(el._id) ? { ...el, done: false } : el
  );
}
function toggleDone(items, itemId) {
  return items.map(el => (el._id === itemId ? { ...el, done: !el.done } : el));
}

// Filter the results of the search box
function searchFilter(items, searchTxt, searchKey) {
  const lowercasedFilter = searchTxt.toLowerCase();
  return items.filter(item => {
    return Object.keys(item).some(
      key =>
        key === searchKey &&
        item[searchKey].toLowerCase().includes(lowercasedFilter)
    );
  });
}

function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}

export {
  updateTodo,
  deleteTodos,
  toggleDone,
  markTodosAsDone,
  markTodosAsNotDone,
  searchFilter,
  isEmpty
};
