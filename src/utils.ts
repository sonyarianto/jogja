export function paginate(array, page_size, page_number) {
  const start_index = (page_number - 1) * page_size;
  const end_index = page_number * page_size;
  const data = array.slice(start_index, end_index);
  const is_last_page = end_index >= array.length;

  return { data, is_last_page };
}
