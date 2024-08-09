import {
  ensureIsArray,
  QueryFormColumn,
  t,
  AdhocColumn,
} from '@superset-ui/core';
import { ControlPanelConfig, ColumnOption } from '@superset-ui/chart-controls';

// Helper functions to replace isAdhocColumn and isPhysicalColumn
const isAdhocColumn = (col: QueryFormColumn): col is AdhocColumn =>
  typeof col === 'object' && 'label' in col;
const isPhysicalColumn = (col: QueryFormColumn): col is string =>
  typeof col === 'string';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'groupbyColumns',
            config: {
              type: 'SelectControl',
              label: t('Columns'),
              description: t('Columns to group by on the columns'),
              multi: true,
              optionRenderer: (c: any) => <ColumnOption column={c} showType />,
              valueRenderer: (c: any) => <ColumnOption column={c} />,
              valueKey: 'column_name',
              mapStateToProps: (state: any) => ({
                options: state.datasource?.columns || [],
              }),
            },
          },
        ],
        [
          {
            name: 'groupbyRows',
            config: {
              type: 'SelectControl',
              label: t('Rows'),
              description: t('Columns to group by on the rows'),
              multi: true,
              optionRenderer: (c: any) => <ColumnOption column={c} showType />,
              valueRenderer: (c: any) => <ColumnOption column={c} />,
              valueKey: 'column_name',
              mapStateToProps: (state: any) => ({
                options: state.datasource?.columns || [],
              }),
            },
          },
        ],
        ['metrics'],
        ['adhoc_filters'],
        ['row_limit'],
      ],
    },
  ],
};

// Define a separate function for form data overrides
export const formDataOverrides = (formData: any) => {
  const groupbyColumns = (formData.columns || []).filter(
    (col: QueryFormColumn) => {
      const groupbyRows = ensureIsArray(formData.groupbyRows);
      return !groupbyRows.some(
        (row: QueryFormColumn) =>
          (isPhysicalColumn(row) && isPhysicalColumn(col) && row === col) ||
          (isAdhocColumn(row) && isAdhocColumn(col) && row.label === col.label),
      );
    },
  );

  const filteredColumns = (formData.columns || []).filter(
    (col: QueryFormColumn) =>
      !groupbyColumns.some(
        (groupCol: QueryFormColumn) =>
          (isPhysicalColumn(groupCol) &&
            isPhysicalColumn(col) &&
            groupCol === col) ||
          (isAdhocColumn(groupCol) &&
            isAdhocColumn(col) &&
            groupCol.label === col.label),
      ),
  );

  return {
    ...formData,
    columns: filteredColumns,
    groupbyColumns,
  };
};

export default config;