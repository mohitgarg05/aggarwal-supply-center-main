// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('E-commerce')
    .items([
      S.documentTypeListItem('product').title('Products'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['product'].includes(item.getId()),
      ),
    ])
